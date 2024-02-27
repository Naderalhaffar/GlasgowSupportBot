import React from 'react';

// Styles for the message container
const messageContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0px'
};

// Styles for the message sender image
const senderImageStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  marginRight: '-40px',
  alignSelf: 'start'
};

// Styles for the message content
const messageContentStyle = {
  maxWidth: '60%',
  textAlign: 'left',
  padding: '5px 10px',
  borderRadius: '20px',
  background: '#e5e5ea',
  fontFamily: "'Roboto', sans-serif",
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  color: 'black', 
  alignSelf: 'start',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const Message = ({ text, sender }) => {
  const imageSrc = sender === 'ai' ? process.env.PUBLIC_URL + '/Universitylogo.jpg' : process.env.PUBLIC_URL + '/user.png';

  // Convert URLs in the text to clickable links
  const linkifyText = (text) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  // Parse the message text and create links
  const messageWithLinks = linkifyText(text);

  return (
    <div className="message" style={messageContainerStyle}>
      <img src={imageSrc} alt={sender} style={senderImageStyle} />
      <div className="message-content" style={{
        ...messageContentStyle,
        background: sender === 'ai' ? '#e5e5ea' : '#e5e5ea',
        color: sender === 'ai' ? 'black' : 'black' // Black text for AI, white for user
      }}>
        <span dangerouslySetInnerHTML={{ __html: messageWithLinks }} style={{ textAlign: 'left' }}></span>
      </div>
    </div>
  );
};

export default Message;
