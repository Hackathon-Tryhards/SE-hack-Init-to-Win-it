import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import DocEditor from './components/DocEditor/DocEditor';

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
      </Routes>
    </>
  )
}

export default App
