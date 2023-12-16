import React from 'react';
import './style.css'; // Make sure the CSS file is in the same directory

const QRCodeComponent = () => {
  return (
    <div className="qr-container">
      <img src="path-to-your-qr-code-image.png" alt="QR Attendance Code" />
    </div>
  );
};

export default QRCodeComponent;
