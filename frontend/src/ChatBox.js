import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import axios from 'axios';
import CryptoJS from 'crypto-js';


const ChatBox = ({ activeChat, readOnly }) => {
    const [messages, setMessages] = useState([]);
    const [isAITyping, setIsAITyping] = useState(false); // New state to track AI response
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (activeChat) {
            setMessages(activeChat.messages || []);
        }
    }, [activeChat]);

    const updateGlobalChats = () => {
        let encryptedChats = localStorage.getItem('chatHistory');
        let chats = JSON.parse(CryptoJS.AES.decrypt(encryptedChats, process.env.REACT_APP_ENCRYPT_SECRET_KEY).toString(CryptoJS.enc.Utf8)); // Decrypting
        const chatIndex = chats.findIndex(chat => chat.id === activeChat.id);
        if (chatIndex !== -1) {
            chats[chatIndex].messages = [...messages]; // Ensure to update with the latest messages
            encryptedChats = CryptoJS.AES.encrypt(JSON.stringify(chats), process.env.REACT_APP_ENCRYPT_SECRET_KEY).toString(); // Encrypting again
            localStorage.setItem('chatHistory', encryptedChats);
        }
    };

    const sendMessage = async (userMessage) => {
        if (readOnly || !activeChat || isAITyping) return;
        setIsAITyping(true);
        const userMessageObj = { text: userMessage, sender: 'user' };
        setMessages([...messages, userMessageObj]);
        activeChat.messages.push(userMessageObj); // Assuming activeChat is a reference type and this updates state

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/ask`, { prompt: userMessage });
            const aiMessageObj = { text: response.data.response.trim(), sender: 'ai' };
            setMessages(messages => [...messages, aiMessageObj]);
            activeChat.messages.push(aiMessageObj); // Update active chat messages
            updateGlobalChats(); // Call here after receiving AI response
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessageObj = { text: "Error getting response.", sender: 'ai' };
            setMessages(messages => [...messages, errorMessageObj]);
            activeChat.messages.push(errorMessageObj); // Update active chat messages on error too
        } finally {
            setIsAITyping(false);
            updateGlobalChats(); // Ensure this is also called here to capture all message updates
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Message key={index} text={message.text} sender={message.sender} />
                    ))
                ) : (
                    <div className="chat-placeholder">
                        <p>Welcome to the chat!</p>
                        <p>Type your message below and press enter to start the conversation.</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {!readOnly && (
                
                <InputBox onSendMessage={sendMessage} isAITyping={isAITyping} />
            )}
        </div>
    );
};

export default ChatBox;
