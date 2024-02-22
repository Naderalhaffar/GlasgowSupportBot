import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import InputBox from './InputBox';
import axios from 'axios';

const ChatBox = ({ activeChat, readOnly }) => {
    const [messages, setMessages] = useState([]);
    const [isAITyping, setIsAITyping] = useState(false); // New state to track AI response
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (activeChat) {
            setMessages(activeChat.messages || []);
        }
    }, [activeChat]);

    const sendMessage = async (userMessage) => {
        if (readOnly || !activeChat || isAITyping) return; // Check if AI is already processing
        setIsAITyping(true); // AI starts processing
        const userMessageObj = { text: userMessage, sender: 'user' };
        setMessages([...messages, userMessageObj]);
        activeChat.messages.push(userMessageObj);
        
        
        try {
            const response = await axios.post('http://localhost:5000/ask', { prompt: userMessage });
            const aiMessageObj = { text: response.data.response.trim(), sender: 'ai' };
            setMessages(messages => [...messages, aiMessageObj]);
            activeChat.messages.push(aiMessageObj);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessageObj = { text: "Error getting response.", sender: 'ai' };
            setMessages(messages => [...messages, errorMessageObj]);
            activeChat.messages.push(errorMessageObj);
        } finally {
            setIsAITyping(false); // AI finishes processing
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
