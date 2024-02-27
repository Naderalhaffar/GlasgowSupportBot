import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import ChatBox from './ChatBox';
import Documentation from './Documentation';
import FAQ from './FAQ';
import ChatHistory from './ChatHistory';
import WelcomePopup from './WelcomePopUp'; 
import SupportService from './SupportService'; 
import Feedback from './Feedback';
import './App.css';


const ExportChatButton = ({ onExport }) => {
  const location = useLocation();
  const showExportButton = location.pathname === '/';
  return showExportButton && <button onClick={onExport} className="export-messages-button">Export Chat</button>;
};

function App() {
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate(); // Added useNavigate hook here
  
  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    navigate("/"); // Navigate to the root path whenever a chat is selected
  };

  const handleDeleteChat = (chatId) => {
    if (activeChat && activeChat.id === chatId) {
      setActiveChat(null);
    }
  };

  const exportMessagesToTxt = () => {
    if (!activeChat || !activeChat.messages || activeChat.messages.length === 0) {
      alert("No messages to export.");
      return;
    }
    const chatContent = activeChat.messages.map(message => {
      // Assuming `sender` distinguishes between 'user' and 'ai'
      const senderPrefix = message.sender === 'user' ? 'User' : 'AI';
      return `${senderPrefix}: ${message.text}\n`;
    }).join('\n');
     const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <WelcomePopup /> 
      <ChatHistory onSelectChat={handleSelectChat} onDeleteChat={handleDeleteChat} />
      <div className="main-content">
        <ExportChatButton onExport={exportMessagesToTxt} />
        <Routes>
          <Route path="/" element={activeChat ? <ChatBox activeChat={activeChat} setActiveChat={setActiveChat} /> : <div>Please select a chat from the history or start a new chat.</div>} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support-service" element={<SupportService />} />
        </Routes>
        <div className="navigation-buttons">
          <Link to="/faq" className="faq-button">FAQ</Link>
          <Link to="/documentation" className="documentation-button">Documentation</Link>
          <Link to="/support-service" className="support-service-button">Support Services</Link>
        </div>
      </div>
      <Feedback/>
    </div>
  );
}

// Wrap App with Router to use useNavigate
function AppWithRouter() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWithRouter;
