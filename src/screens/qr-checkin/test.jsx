import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './test1.css';
import gif from './qr.gif';
import SessionInformation from 'C:/Users/hi/OneDrive/Documents/qr-app/src/screens/startsession/index';

const MessageBox = ({ message, onClose }) => (
  <div className="message-box">
    <button className="close-button" onClick={onClose}>X</button>
    <h2>Time's Up!!!!</h2>
    <p>{message}</p>
  </div>
);

const Countdown = () => {
  const [showSession, setShowSession] = useState(true );
  const [countdown, setCountdown] = useState(10);
  const [expired, setExpired] = useState(false);

  
  const toggleVisibility = () => {
    setShowSession(!showSession);
    
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setExpired(true);
      // You can add additional effects or actions here
    }
  }, [countdown]);

  const resetCountdown = () => {
    setCountdown(10);
    setExpired(false);
  };


  const formattedCountdown = `${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(countdown % 60).padStart(2, '0')}`;

  return (
    

    <div className="outer-container1">
      <div className="top-bar">
        <h2>Attendance Time!</h2>
    </div>


      <div className="new-message-box">
        <div className="instruction-text">INSTRUCTION</div>
      </div>

      <div className="new-message-box1">
        <div className="instruction-text">QR Code Attendance</div>

        {!expired && (
          <div className="gif-container">
            <img src={gif} alt="Your GIF" />
          </div>
        )}

      </div>

      <div className={`countdown-container ${expired ? 'expired' : ''}`}>
        <h5>Scan the QR code for your attendance please!</h5>
        {expired ? (
          <>
            <MessageBox message="Good morning, guys!" onClose={resetCountdown} />
            {showSession ?  null : <SessionInformation /> }
            <button onClick={toggleVisibility}
            className="manual-check-button">
            Manually Check
            </button>

          </>
        ) : (
          <>
          <p style={{ fontWeight: 'bold', fontSize: '24px' }}>{formattedCountdown}</p>
          
          </>
        )}
            
      </div>
    </div>
  );
}

export default Countdown;
