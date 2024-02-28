import React, { useState, useEffect } from 'react';

const ChatHistory = ({ onSelectChat, onDeleteChat }) => {
  const [chats, setChats] = useState(() => {
    // Get chats from local storage or return an empty array if none
    const savedChats = localStorage.getItem('chatHistory');
    return savedChats ? JSON.parse(savedChats) : [];
  });

  // Save chats to local storage whenever the chats array changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chats));
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

  // Convert timestamp to a readable date string
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
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
