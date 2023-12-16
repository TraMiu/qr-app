import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, Grid} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";


import "./style.css";
import SectionSelection from '../global/SectionSeletion';



// Define the possible statuses with corresponding icons and colors
const statuses = [
    { color: 'grey' },
    { icon: <CheckCircleOutlineIcon />, color: 'green' },
    { icon: <HighlightOffIcon />, color: 'red' },
    { icon: <ArrowForwardIosIcon />, color: 'orange' }
];

function AttendanceCell({ initialStatus, onStatusChange }) {
const [statusIndex, setStatusIndex] = useState(initialStatus);

const toggleStatus = () => {
    const nextStatusIndex = (statusIndex + 1) % statuses.length;
    setStatusIndex(nextStatusIndex);
    onStatusChange && onStatusChange(nextStatusIndex);
};

return (
    <Grid item xs> {/* xs will automatically layout the buttons equally */}
    <Button
        onClick={toggleStatus}
        variant="outlined"
        sx={{
        color: statuses[statusIndex].color,
        borderColor: statuses[statusIndex].color,
        // width: '100%', // Occupy the full width of the grid item
        height: '100%', // Occupy the full height of the grid item
        minHeight: 56, // Minimum height for the button (adjust as needed)
        '&:hover': {
            borderColor: statuses[statusIndex].color, // Maintain border color on hover
        },
        }}
    >
        {statuses[statusIndex].icon}
    </Button>
    </Grid>
);
}

function AttendanceRow() {
    // Example array to represent the status of each cell in the row
    const statusArray = Array(8).fill(0); // Replace with actual initial statuses
  
    return (
      <Grid container spacing={0} /*sx={{ flexGrow: 2}}*/>
        {statusArray.map((initialStatus, index) => (
          <AttendanceCell key={index} initialStatus={initialStatus} />
        ))}
      </Grid>
    );
}
  
// function AttendanceGrid() {
//     // Example array for multiple rows
//     const rows = Array(5).fill(0); // Replace with actual data
  
//     return (
//       <Grid container direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
//         {rows.map((_, rowIndex) => (
//           <AttendanceRow key={rowIndex} />
//         ))}
//       </Grid>
//     );
// }

function Row({student}) {
    return (
        <div className="student-row">
            <img
            className="avatar"
            src={student.imageUrl}
            alt={'Photo of ' + student.name}
            style={{
                width: "54px",
                height:"54px"
            }}
            />
            <Box className="student-info" sx={{marginLeft: "2rem"}}>
                <h3 className="student-name" >{student.name} (Section {student.section})</h3>
                <p className="student-email">{student.email}</p>
            </Box>        
        </div>
    );
}

function StudentRow({ student }) {
  const [status, setStatus] = useState(0); // Default to first status

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // TODO: Implement any additional logic on status change
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="left" >
    
      <Row student={student}/>
      <AttendanceRow/>
    </Box>
  );
}

function AttendanceTable({ students }) {

    const listItems = students.map((student, index) =>
        <StudentRow key={index} student={student} />
    );
    return (
        <Box style={{maxHeight: '30rem', overflow: 'auto'}}>

            {listItems}
        </Box>
    );
}



// Main component
function RecordGrid() {
  // Sample data for students
    const student = {
        name: 'Hedy Lamarr',
        email: 'uyenlisadaisy@gmail.com',
        section: 2,
        imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',

    };

    const studentList = [];
    for (let i = 0; i < 30; i++) {
        studentList.push(student)
    } 

  return (
    
    <Box className="attendance-check" >
      <AttendanceTable students={studentList}/>
    </Box>
  );
}








function Pagination({ pageCount = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const courses = ["Course 1", "Course 2", "Course 3"];
  const [selectedCourse, setSelectedCourse] = useState('');
  

  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(current => Math.max(current - 1, 1));
  const goToNextPage = () => setCurrentPage(current => Math.min(current + 1, pageCount));
  const goToLastPage = () => setCurrentPage(pageCount);

  const handleCourseChange = (event) => {
    if (event.target.value === "custom") {
      // If the custom option is selected, focus on the custom course input
      document.getElementById('custom-course-input').focus();
    } else {
      setSelectedCourse(event.target.value);
    }
  };

  return (
    <Box sx={{marginTop:"1rem", borderRadius: "0.5rem", maxWidth: "72rem", marginLeft: "2rem"}}>
        <SearchBar/>
        <Typography variant="h6" marginTop="0.5rem" align="center" gutterBottom >
            Attendance Record
        </Typography>
        <Box marginTop="0.3rem" >
            <SectionSelection courses={["1", "2", "3"]} selectedCourse="1"/>
        </Box>

        <Box sx={{ backgroundColor: '#154884', color: 'primary.contrastText', borderRadius: "0.5rem"}}>
            <Box display="flex" alignItems="center" justifyContent="center" padding={2} >
                <IconButton onClick={goToFirstPage} disabled={currentPage === 1}>
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={goToPreviousPage} disabled={currentPage === 1}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography color='#9EB3D5' fontWeight='bold' marginLeft='1.5rem' marginRight='1.5rem'>{`Page: ${currentPage}/${pageCount}`}</Typography>
                <IconButton onClick={goToNextPage} disabled={currentPage === pageCount}>
                    <ChevronRightIcon />
                </IconButton>
                <IconButton onClick={goToLastPage} disabled={currentPage === pageCount}>
                    <LastPageIcon color='white'/>
                </IconButton>
            </Box>
        </Box>
        <RecordGrid/>
    </Box>
  );
}


function SearchBar() {
    return (
        <Box
            display="flex"
            backgroundColor="#154884"
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1, color: "#ffffff"}} placeholder="Search student..." />
            <IconButton type="button" sx={{ p: 1, color: "#ffffff"}}>
            <SearchIcon />
            </IconButton>
        </Box>
    )
}

export default function TeacherRecords() {
  // You can determine pageCount dynamically based on data
  const pageCount = 10; // example static page count

  return (
    
    <Pagination pageCount={pageCount}></Pagination>
    
  );
}
