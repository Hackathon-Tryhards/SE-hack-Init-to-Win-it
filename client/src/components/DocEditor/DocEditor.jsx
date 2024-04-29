import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { io } from 'socket.io-client';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, } from "draft-js";
import Toolbar from "./Toolbar";
import "./DocEditor.css";


const SERVERURL = 'http://localhost:3000'
const socket = io(SERVERURL);


const DocEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const { docID } = useParams();
  const [success, setSuccess] = useState(false);  // For autosave

  const editor = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${SERVERURL}/sendDocument/${docID}`);
      console.log(response.data);
      const result = JSON.stringify(response.data);
      const newContentState = convertFromRaw(JSON.parse(result));
      console.log(newContentState);
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters' // Preserve selection mode
      );
      setEditorState(newEditorState);
    };

    fetchData();
  }, [docID])


  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Saving");
      const contentState = editorState.getCurrentContent();
      socket.emit('save', { docID: docID, content: JSON.stringify(convertToRaw(contentState)) });
      setSuccess(true);
    }, 2000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [docID, editorState]);

  useEffect(() => {
    socket.on(`updateContent${docID}`, (updatedContent) => {
      const newContentState = convertFromRaw(updatedContent);
      const selectionState = editorState.getSelection(); // Get current selection
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters' // Preserve selection mode
      );
      const newSelectionState = selectionState.merge({
        anchorOffset: selectionState.getAnchorOffset(), // Preserve anchor offset
        focusOffset: selectionState.getFocusOffset(), // Preserve focus offset
      });
      const updatedEditorState = EditorState.forceSelection(
        newEditorState,
        newSelectionState // Apply preserved selection
      );
      setEditorState(updatedEditorState);
    });

    return () => {
      socket.off('disconnect');
    };
  }, [docID, editorState]);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        break;
    }
  };

  return (
    <div className="editor-wrapper" onClick={focusEditor}>
      <Toolbar editorState={editorState} setEditorState={setEditorState} />
      <div className="editor-container">
        <Editor
          ref={editor}
          // placeholder="Write Here"
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={(editorState) => {
            const contentState = editorState.getCurrentContent();
            // console.log(convertToRaw(contentState));
            socket.emit('edit', { docID: docID, content: convertToRaw(contentState) });
            setEditorState(editorState);
          }}
        />
      </div>
    </div>
  );
};

export default DocEditor;
