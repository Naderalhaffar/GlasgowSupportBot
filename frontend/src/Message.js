import React from 'react';

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
    <div className="message" style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
      <img src={imageSrc} alt={sender} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: '-40px', alignSelf: 'start' }} />
      <div className="message-content" style={{
        maxWidth: '60%',
        textAlign: 'left',
        padding: '5px 10px',
        borderRadius: '15px',
        background: sender === 'ai' ? '#e5e5ea' : '#e5e5ea', 
        color: sender === 'ai' ? 'black' : 'black', // Black text for AI, white for user
        alignSelf: 'start',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <span dangerouslySetInnerHTML={{ __html: messageWithLinks }} style={{ textAlign: 'left' }}></span>
      </div>
    </div>
  );
};

export default Message;
