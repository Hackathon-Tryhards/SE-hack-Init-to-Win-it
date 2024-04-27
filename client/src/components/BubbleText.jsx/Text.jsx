import React from "react";
import styles from  "./bubble.css";

const Text = ({text}) => {
  return (
    <div className="grid h-screen place-content-center bg-black">
      <BubbleText text={text} />
    </div>
  );
};

const BubbleText = ({text}) => {
  return (
    <h2 className="text-center text-5xl font-thin text-indigo-300">
      {text.split("").map((child, idx) => (
        <span className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Text;