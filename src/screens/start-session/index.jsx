import { useState } from 'react';
import "./style.css";
import Title from '../global/Title';
import SectionPicker from '../global/SectionPicker';
import { Box, Button } from '@mui/material';
import QRDatePicker from '../global/QRDatePicker';
import QRScreen from '../qr-checkin';
import { useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';



const SessionInformation = () => {
 
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [showQRScreen, setShowQRScreen] = useState(false); // State to control screen display
  const [selectedDate, setSelectedDate] = useState(new dayjs());

  useEffect(() => {
    const fetchSections = async () => {
        try {
            const currentDayName = getSelectedDayName();
            const instructorId = '123'; // Replace with the actual instructor ID
  
            const response = await axios.get('http://localhost:3001/availableSections', {
                params: {
                    day: currentDayName,
                    instructorId: instructorId
                }
            });
            const data = response.data
            const availableSections = data.flatMap(data => data.courses);
 
            
            if (availableSections.length > 0) {
                setSections(availableSections);
                setSelectedSection(availableSections[0]); // Set the first course as the selected section
                console.log(selectedSection)
            } else {
                setSections(["No section available"]);
                setSelectedSection(""); // Reset or set to a default value
            }         
          
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };
  
    fetchSections();
  }, [selectedDate]);


  
  if (showQRScreen) {
    return <QRScreen />; // Replace this with the actual QR Screen component you have
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  function getSelectedDayName() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (selectedDate instanceof Date) {
        return days[selectedDate.getDay()];
    } else {
        return days[selectedDate.day()]; // or some default value
    }
  }

  
  return (
    <Box sx={{padding: "3rem"}}>
      <div className="session-info-container">
        <Title text="Session Information"/>
        <Box margin="2rem">
          <div className="section">
            <h3>Check In</h3>
            <p>Starting students check-in will allow students to check-in on their own devices, but will prevent you from manually taking attendance.</p>
            <ul>
              <li>A dynamic QR code will be generated on the next screen that students will need to scan. This code will changes every 5 seconds.</li>
              <li>Students will have 2 minutes to check-in before the check-in period will automatically close.</li>
            </ul>
          </div>
          <div className="section">
            <h3>Course</h3>
            <SectionPicker sections={sections} selectedSection={selectedSection}/>
                  
          </div>
          <div>
            <h3>Section Date</h3>
            <QRDatePicker onDateChange={handleDateChange}/>
          </div>
        </Box>
      </div>
      <Box sx={{
        display: 'flex',         // Enable flexbox
        justifyContent: 'center' // Center the button horizontally
      }} margin="2rem">
        <Button variant="contained" 
        sx={{borderRadius: "1rem", backgroundColor: '#C72027'}}
        onClick={() => setShowQRScreen(true)}>Start Check In</Button>
      </Box>
    </Box>
    
  );
};

export default SessionInformation;



