import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';
import SetGoal from './pages/SetGoal';
import DocEditor from './components/DocEditor/DocEditor';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/doc/:docID" element={<DocEditor />} />
        <Route path="/setgoal" element={<SetGoal />} />
      </Routes>
    </>
  )
}

export default App
