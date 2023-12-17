import "./style.css";
import { colors } from "../../theme";
import { useState } from 'react';
import ButtonGroup from "../../components/ButtonGroup";
import { IconButton } from "@mui/joy";
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box} from "@mui/material";
import SectionSelection from "../global/SectionSeletion";

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

function Total() {
    return (
        <div className="total">
            <h3 style={{marginLeft: '15%', width: '400px'}}>Student Name</h3>
            <h3>Status</h3>
            <h3 style={{marginRight: '7%'}}>Note</h3>
        </div>
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
            borderRadius="3px"
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
    const [selectedSection, setSelectedSection] = useState('1');
    const handleCourseChange = (event) => {
        if (event.target.value === "custom") {
          // If the custom option is selected, focus on the custom course input
          document.getElementById('custom-course-input').focus();
        } else {
          setSelectedSection(event.target.value);
        }
    };
    return (
        
        <Box  className="frame">
            <SearchBar/>
            
            <MarkAll/>
            <Box sx={{backgroundColor: "#E3EEFA"}}>
                <SectionSelection selectedSection={selectedSection} sections={["1", "2", "3", "4"]}/>
            </Box>
            
            <Title/>
            
            <StudentList/>
        </Box>
    );
}

export default AttendanceCheck;
  