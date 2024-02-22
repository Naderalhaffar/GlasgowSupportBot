import React, { useState } from 'react';

const InputBox = ({ onSendMessage, isAITyping }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isAITyping) {
      onSendMessage(input);
      setInput(''); // Clear the input only after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isAITyping) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-container">
      <textarea
        className="input-text"
        placeholder="Type your Query here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        rows={1} // Starts with a single line and grows vertically as needed
        // The textarea remains always enabled, allowing users to type and edit their message
      />
      <button className="send-button" onClick={handleSend} disabled={isAITyping}>
        {isAITyping ? 'Typing...' : 'Send'}
      </button>
    </div>
  );
};

export default InputBox;
