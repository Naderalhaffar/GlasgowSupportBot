import React, { useState, useEffect } from 'react';

const WelcomePopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [hoverGotIt, setHoverGotIt] = useState(false);
    const [hoverNeverAgain, setHoverNeverAgain] = useState(false);
  
    useEffect(() => {
      const neverShowAgain = localStorage.getItem('neverShowWelcomePopup');
      if (neverShowAgain !== 'true') {
        const popupLastClosed = localStorage.getItem('popupLastClosed');
        const twelveHoursAgo = Date.now() - 12 * 60 * 60 * 1000;
        if (!popupLastClosed || new Date(popupLastClosed).getTime() < twelveHoursAgo) {
          setShowPopup(true);
        }
      }
    }, []);
  
    const handleClose = () => {
      localStorage.setItem('popupLastClosed', new Date().toISOString());
      setShowPopup(false);
    };
  
    const handleNeverShowAgain = () => {
      localStorage.setItem('neverShowWelcomePopup', 'true');
      setShowPopup(false);
    };
    
  const styles = {
    popupBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popupContainer: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '80%',
      maxWidth: '600px',
      textAlign: 'left',
      fontFamily: '"Arial", sans-serif',
      fontSize: '18px',
      lineHeight: '1.6',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '15px',
      opacity: hoverGotIt ? 0.7 : 1, 
      transition: 'opacity 0.2s', // Smooth transition
    },
    secondaryButton: {
      backgroundColor: 'grey',
      marginTop: '10px',
      opacity: hoverNeverAgain ? 0.7 : 1, // Change opacity on hover
      transition: 'opacity 0.2s', // Smooth transition
    },
    list: {
        listStyle: 'none', // Removes default list styling
        padding: 0,
        marginLeft: '20px',
      },
      listItem: {
        marginBottom: '10px',
        position: 'relative',
      },
      listItemBefore: {
        content: '•', // Using a bullet character
        color: 'black', // Bullet color
        fontWeight: 'bold', // Make bullet bold
        display: 'inline-block', 
        width: '1em', // Ensures indentation for bullet
        marginLeft: '-1em', // Negative margin to align with the text
      },
  };
  if (!showPopup) {
    return null;
  }

  return (
    <div style={styles.popupBackground}>
      <div style={styles.popupContainer}>
        <h2>Welcome to GlasgowSupportBot!</h2>
        <p>GlasgowSupportBot is here to help you with questions you might have about the University of Glasgow's support services. Here are a few things you can ask me:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>Overview of the University of Glasgow support services 🎓</li>
          <li style={styles.listItem}>Specific services including Disability Service, Good Cause Claims, and support for International Students 🌍</li>
          <li style={styles.listItem}>Example question: "Where can I find information about financial aid?" 💰</li>
        </ul>
        <p>If you need further assistance or wish to speak to a human, please don't hesitate to visit the <a href="https://www.gla.ac.uk/selfservice" style={{ color: '#007bff' }}>UofG Helpdesk</a>.</p>
        <button
           style={styles.button}
           onMouseEnter={() => setHoverGotIt(true)}
           onMouseLeave={() => setHoverGotIt(false)}
           onClick={handleClose}
         >
           Got it!
         </button>
         <button
           style={{ ...styles.button, ...styles.secondaryButton }}
           onMouseEnter={() => setHoverNeverAgain(true)}
           onMouseLeave={() => setHoverNeverAgain(false)}
           onClick={handleNeverShowAgain}
         >
           Never show this again
         </button>
       </div>
     </div>
   );
 };
 
 export default WelcomePopup;
