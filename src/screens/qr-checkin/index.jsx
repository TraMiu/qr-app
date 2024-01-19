import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import Title from '../global/Title';
import SessionInformation from '../start-session';
import axios from 'axios';
import "C:/Users/hi/Downloads/qr-app-frontend/qr-app-frontend/src/screens/qr-checkin/test1.css"


const QRScreen = ({ selectedSection, selectionDate }) => {
  const DEFAULT_REFRESH_TIME = 3;
  const [showSessionInformation, setShowSessionInformation] = useState(false);
  const [openDialog, setOpenDialog] = useState(true); // State to control the dialog
  const [minutesInput, setMinutesInput] = useState(''); // State to store minutes input
  const [secondsInput, setSecondsInput] = useState(''); // State to store seconds input
  const [timeLeft, setTimeLeft] = useState(0); // Initialize with 0
  const [refreshTime, setRefreshTime] = useState(DEFAULT_REFRESH_TIME * 1000)
  const [imageUrl, setImageUrl] = useState('https://i.imgur.com/yXOvdOSs.jpg');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    // exit early when we reach 0
    if (timeLeft <= 0) return;

    // save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      // When timeLeft is 0 or less, stop fetching new images
      return;
    }

    // Function to fetch new image URL
    const fetchNewImageUrl = async () => {
      try {
        const instructorId = '456';
        const response = await axios.get('http://localhost:3003/qrsessions', {
          params: {
              instructorId: instructorId
          }
        });

        const data = response.data
        const timeLeft = data.map(data => data.sessionTime)
        const refreshTime = data.map(data => data.refreshTime)
        const newImageUrl = data.map(data => data.imageUrl)
        console.log(timeLeft)
        setImageUrl(newImageUrl);
        setTimeLeft(timeLeft * 60);
        setRefreshTime(refreshTime * 1000)
      } catch (error) {
        console.error('Error fetching new image URL:', error);
      }
    };

    // Set up interval to fetch new image URL every 5 seconds
    const intervalId = setInterval(() => {
      fetchNewImageUrl();
    }, refreshTime);

    // Clear interval on cleanup
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    const totalSeconds = (parseInt(minutesInput) || 0) * 60 + (parseInt(secondsInput) || 0);
    setTimeLeft(totalSeconds); // Set the total time in seconds
};

  

  // Convert time for display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showSessionInformation) {
    return <SessionInformation />;
  }

  return (
    <Box className="qr-screen-container" sx={{ padding: "6%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Horizontal container for QR code and instructions */}
      <Dialog open={openDialog} onClose={handleDialogClose} className="custom-dialog" disableEscapeKeyDown={true} >
  <DialogTitle className="custom-dialog-title">Set Timer</DialogTitle>
  <DialogContent className="custom-dialog-content">
    <DialogContentText>
      Please enter the timer.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="minutes"
      label="Minutes"
      type="number"
      variant="outlined"
      onChange={(e) => setMinutesInput(e.target.value)}
      className="custom-text-field"
    />
    <TextField
      margin="dense"
      id="seconds"
      label="Seconds"
      type="number"
      variant="outlined"
      onChange={(e) => setSecondsInput(e.target.value)}
      className="custom-text-field"
    />
  </DialogContent>
  <DialogActions className="custom-dialog-actions">
    <Button onClick={handleDialogClose} className="custom-start-button">Start</Button>
  </DialogActions>
</Dialog>


      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* QR code container */}
        <Box className="qr-code-container" sx={{ flexBasis: '60%', marginRight: "5%", borderRadius: '1rem', boxShadow: 3}}>
          <Title text="QR ATTENDANCE CODE" />
          <img src={timeLeft === 0 ? '../../assets/vinunilogo.png' : 'https://i.imgur.com/yXOvdOSs.jpg'} alt="QR Attendance Code" style={{ width: '90%', margin: '5%', opacity: timeLeft === 0 ? '0.3' : '1',}} />
        </Box>

        {/* Instructions container */}
        <Box className="instruction-container" sx={{ flexBasis: '50%', bgcolor: 'white', borderRadius: '1rem', boxShadow: 3 }}>
          <Title text="Instruction" />
          <Box sx={{padding: "4%"}}>
            <Typography variant="body1" sx={{ marginBottom: '2%' }}>
              <span style={{fontWeight: "bold"}}>Scan the attached QR Code</span> to check your attendance of today class:
            </Typography>
            <span style={{fontWeight: "bold", variant: "body1"}}>{selectedSection}</span>
            <div style={{variant: "body1"}}>Date: <span style={{fontWeight: "bold"}}>{selectionDate.format('DD/MM/YYYY')}</span></div>
            <Box sx={{ alignItems: 'center', mt: "2%", alignContent: "center"}}>
            <Typography variant="body1" textAlign="left" sx={{ marginBottom: '4%' }} component="span">
              {timeLeft === 0 ? "Session closed!" : "Session will close after:"}
            </Typography>
            {timeLeft > 0 && (
              <Paper elevation={4} sx={{ ml: "6%", px: 2, py: 1, display: 'inline', bgcolor: '#14ae5c', borderRadius: '1rem', alignItems: "center"}}>
                <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: 'info.contrastText'}} textAlign="center">
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </Typography>
              </Paper>
            )}
            </Box>
          </Box>
          
        </Box>

      </Box>

      <Button variant="contained" 
        sx={{
          borderRadius: "1rem",
          backgroundColor: '#C72027',
          marginTop: "5%",
          '&:hover': {
            backgroundColor: 'rgba(199, 32, 39, 0.8)', // '#C72027' with 60% opacity
          },
        }}
        onClick={() => setShowSessionInformation(true)}
      >
        Start Another Check In
      </Button>
    </Box>
  );
};

export default QRScreen;


