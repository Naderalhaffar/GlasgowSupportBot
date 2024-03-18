import React, { useState, useEffect } from 'react';

import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_ENCRYPT_SECRET_KEY; // Use a secure, randomly generated key here

// Function to encrypt data before storing it
const encryptData = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
};

// Function to decrypt data after retrieving it
const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error decrypting chat history:", error);
        return []; // Return an empty array or some default state in case of error
    }
};



const ChatHistory = ({ onSelectChat, onDeleteChat }) => {
  const [chats, setChats] = useState(() => {
    try {
      const savedChats = localStorage.getItem('chatHistory');
      return savedChats ? decryptData(savedChats) : [];
    } catch (error) {
      console.error("Error parsing chat history from localStorage:", error);
      return []; // Return an empty array or some default state
    }
  });

  // Save chats to local storage whenever the chats array changes
  useEffect(() => {
    try {
      const encryptedChats = encryptData(chats);
      localStorage.setItem('chatHistory', encryptedChats);
    } catch (error) {
      console.error("Error encrypting and saving chat history:", error);
    }
  }, [chats]);

  const createNewChat = () => {
    if (chats.length >= 5) {
      // Notify user that no more chats can be created, if desired
      alert("Maximum number of chats reached. Please delete an old chat before creating a new one.");
      return; // Prevent the creation of a new chat
    }
    const newChat = { id: Date.now(), messages: [] }; // Use current timestamp as a unique ID
    setChats([...chats, newChat]);
    onSelectChat(newChat); // Select the new chat
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    onDeleteChat(chatId); 
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };

  return (
    <div className="history-panel">
      <button onClick={createNewChat}>New Chat</button>
      {chats.map((chat) => (
        <div key={chat.id} className="history-item" onClick={() => onSelectChat(chat)} style={{cursor: 'pointer'}}>
          <span>{formatDate(chat.id)}</span>
          <button className="delete-chat-button" onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}>
            <i className="fa fa-trash"></i> 
          </button>
        </div>
      ))}
    </div>
  );  
};
export default ChatHistory;