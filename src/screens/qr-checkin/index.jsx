import React from 'react';
import './style.css'; // Make sure the CSS file is in the same directory
import { useState } from 'react';
import "./style.css";
import Title from '../global/Title';
import SectionPicker from '../global/SectionPicker';
import { Box, Button } from '@mui/material';
import QRDatePicker from '../global/QRDatePicker';
import SessionInformation from '../start-session';


const QRScreen = () => {
  
  const [showSessionInformation, setShowSessionInformation] = useState(false); // State to control screen display

  if (showSessionInformation) {
    return <SessionInformation/>; // Replace this with the actual QR Screen component you have
  }

  return (
    <Box>
      <Box>
        
      </Box>
      <img src='https://i.imgur.com/yXOvdOSs.jpg' alt="QR Attendance Code" />
      <Box sx={{
        display: 'flex',         // Enable flexbox
        justifyContent: 'center' // Center the button horizontally
      }} margin="2rem">
        <Button variant="contained" 
        sx={{borderRadius: "1rem", backgroundColor: '#C72027'}}
        onClick={() => setShowSessionInformation(true)}>Start Another Check In</Button>
      </Box>
    </Box>
  );
};

export default QRScreen;
