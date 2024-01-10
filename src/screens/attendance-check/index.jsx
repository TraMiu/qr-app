import "./style.css";
import { useState } from 'react';
import ButtonGroup from "../../components/ButtonGroup";
import { IconButton } from "@mui/joy";
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import axios from "axios";

import SectionPicker from "../global/SectionPicker";
import QRDatePicker from "../global/QRDatePicker";



// DATA SECTION
const student = {
    name: 'Hedy Lamarr',
    email: 'uyenlisadaisy@gmail.com',
    section: 2,
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',

};
const courses = ["Course A", "Course B"];
const first = {
    name: 'Cong Chua Bong Bong Bap Bong',
    email: 'uyenlisadaisy@gmail.com',
    section: 2,
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',

};

const studentList = [first];
for (let i = 0; i < 30; i++) {
    studentList.push(student)
} 

// SUBCOMPONENTS

function StudentRow(props) {
    return (
        <div className="student-row">
            <img
            className="avatar"
            src={props.student.imageUrl}
            alt={'Photo of ' + props.student.name}
            style={{
                width: "54px",
                height:"54px"
            }}
            />
            <Box className="student-info">
                <h3 className="student-name" >{props.student.name} (Section {props.student.section})</h3>
                <p className="student-email">{props.student.email}</p>
            </Box>
            <ButtonGroup/>
            <IconButton aria-label="note" size="large" style={{marginRight: '5%'}}>
                <SpeakerNotesRoundedIcon style={{ fill: '#154884' }}/>
            </IconButton>
          
           
           
        </div>
    );
}


// MAIN COMPONENTS

function Title() {
    return (
        <div className="title">
           
            <h3 style={{marginLeft: '15%', width: '400px'}}>Student Name</h3>
            <h3>Status</h3>
            <h3 style={{marginRight: '7%'}}>Note</h3>
        </div>
    );
}

function StudentList() {
    const listItems = studentList.map(student =>
        <StudentRow student={student}/>
    );
    return (
        <Box style={{maxHeight: '28rem', overflow: 'auto'}}>

            {listItems}
        </Box>
    );
}



function MarkAll() {
   
    return (
        <div className="mark-all">
            
            <h3 style={{marginLeft: '15%', width: '400px'}}>Mark all as: </h3>
            <ButtonGroup sx={{marginLeft: "0"}}/>
          
            
            <div style={{marginRight: '10%'}}></div>
            
        </div>
    );
}

function SearchBar() {
    return (
        <Box
            display="flex"
            backgroundColor="#154884"
            borderRadius="0.5rem"
        >
            <InputBase sx={{ ml: 2, flex: 1, color: "#ffffff"}} placeholder="Search student..." />
            <IconButton type="button" sx={{ p: 1, color: "#ffffff"}}>
            <SearchIcon />
            </IconButton>
        </Box>
    )
}
  
// export default function AttendanceCheck() 

const AttendanceCheck = () => {

    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');  
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


    function getSelectedDayName() {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if (selectedDate instanceof Date) {
            return days[selectedDate.getDay()];
        } else {
            return days[selectedDate.day()]; // or some default value
        }
    }

    const handleCourseChange = (event) => {
        if (event.target.value === "custom") {
          // If the custom option is selected, focus on the custom course input
          document.getElementById('custom-course-input').focus();
        } else {
          setSelectedSection(event.target.value);
        }
    };

    
    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };
    return (
        
        <Box  className="frame">
            <SearchBar/>
            
            <MarkAll/>
            <Box  display="flex" alignItems="center" justifyContent="space-between" sx={{backgroundColor: "#154884", borderRadius: "0.5rem"}}>
                <Box sx={{width: "50%"}}>
                    <SectionPicker selectedSection={selectedSection} sections={sections} />
                </Box>
                <Box sx={{width: "30%", padding: "0.5rem"}}>
                    <QRDatePicker onDateChange={handleDateChange}/>
                </Box>
            </Box>
            
            <Title/>
            
            <StudentList/>
        </Box>
    );
}

export default AttendanceCheck;
  