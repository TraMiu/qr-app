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

function StudentRow(props) {

    const { student, classId, globalStatus } = props;
    
    const [localStatus, setLocalStatus] = useState(student.status);

    // // Use globalStatus if it's set, else use student's individual status
    // const initialStatus = globalStatus || student.status;

    useEffect(() => {
        // If globalStatus is set, use it to update localStatus
        if (globalStatus) {
            setLocalStatus(globalStatus);
        }
    }, [globalStatus, student.status]);

    const handleStatusChange = async (newStatus) => {
        setLocalStatus(newStatus);
    
        try {
            // Fetch the class data
            const classResponse = await axios.get(`http://localhost:3004/classes?id=${classId}`);
            const classData = classResponse.data[0]; // Assuming there is only one class with the specified ID
    
            console.log(classData);
    
            // Check if classData exists
            if (classData) {
                // Find the student and update the status
                const studentIndex = classData.students.findIndex(s => s.id === props.student.id);
    
                if (studentIndex !== -1) {
                    classData.students[studentIndex].status = newStatus;
    
                    // Update the class data on the server using PUT
                    await axios.put(`http://localhost:3004/classes/${classId}`, classData);
    
                    console.log('Student status updated successfully');
                } else {
                    console.log('Student not found');
                }
            } else {
                console.log('Invalid class data');
            }
        } catch (error) {
            console.error('Error updating student status:', error);
        }
    };
    

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
            {/* <ButtonGroup initialStatus={initialStatus} onStatusChange={handleStatusChange}/> */}
            <ButtonGroup initialStatus={localStatus} onStatusChange={handleStatusChange} />
            <IconButton aria-label="note" size="large" style={{marginRight: '5%'}}>
                <SpeakerNotesRoundedIcon style={{ fill: '#154884' }}/>
            </IconButton>
           
        </div>
    );
}


function StudentList({studentList, classId, globalStatus}) {
    const listItems = studentList.map(student =>
        <StudentRow key={student.id} student={student} classId={classId} globalStatus={globalStatus} />
    );
    return (
        <Box style={{maxHeight: '28rem', overflow: 'auto'}}>

            {listItems}
        </Box>
    );
}



function Title() {
    return (
        <div className="title">
           
            <h3 style={{marginLeft: '15%', width: '400px'}}>Student Name</h3>
            <h3>Status</h3>
            <h3 style={{marginRight: '7%'}}>Note</h3>
        </div>
    );
}


function MarkAll({ onGlobalStatusChange, initialStatus }) {
    // Use ButtonGroup here and handle the status change
    const [globalStatus, setGlobalStatus] = useState(initialStatus);
  
    const handleStatusChange = (status) => {
      setGlobalStatus(status);
      onGlobalStatusChange(status);
    };
  
    return (
      <div className="mark-all">
        <h3 style={{ marginLeft: '15%', width: '400px' }}>Mark all as: </h3>
        <ButtonGroup initialStatus={globalStatus} onStatusChange={handleStatusChange} />
        <div style={{ marginRight: '10%' }}></div>
      </div>
    );
  }



function SearchBar({ onSearchInputChange }) {
    return (
        <Box
            display="flex"
            backgroundColor="#154884"
            borderRadius="0.5rem"
        >
            <InputBase
                sx={{ ml: 2, flex: 1, color: "#ffffff"}}
                placeholder="Search student..."
                onChange={(event) => onSearchInputChange(event.target.value)}
            />
            <IconButton type="button" sx={{ p: 1, color: "#ffffff"}}>
                <SearchIcon />
            </IconButton>
        </Box>
    );
}
  

// MAIN COMPONENTS

const AttendanceCheck = ({role, userId, courseId}) => {
    const GET_SECTION_API = `http://localhost:3002/api` // Delete this when run BE
  // const GET_SECTION_API = `/api/courses/${courseId}/sections/`  // Uncomment this when run BE
    const GET_DATE_API_BASE_URL = 'http://localhost:3001' // Delete this when run BE
    const GET_STATUSES_API_BASE_URL = 'http://localhost:3004'
    
    function convertDateFormat(dateStr) {
        const parts = dateStr.split('-');
        if (parts.length !== 3) {
            throw new Error('Invalid date format. Expected DD-MM-YYYY');
        }
    
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    }    
    
    const [sectionNames, setSectionNames] = useState([]);
    const [sectionIDs, setSectionIds] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');  
    const [selectedDate, setSelectedDate] = useState(new dayjs());

    const [studentList, setStudentList] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [globalStatus, setGlobalStatus] = useState(null);

    const [className, setClassName] = useState("");
    
    function getSectionId(sectionName) {
        // Assuming sectionIds and sectionNames are accessible within this function
        const index = sectionNames.indexOf(sectionName);
        // Check if the sectionName was found
        if (index !== -1) {
            return sectionIDs[index];
        } else {
            // Return null or some error value if the sectionName is not found
            return null;
        }
    }
    
    
    useEffect(() => {
        const fetchSections = async () => {
            try {
                
                const response = await axios.get(GET_SECTION_API);
                const data = response.data
                const className = data.course_name;
                const availableSections = data.section_list;
                const sectionNames = availableSections.map(section => section.section_name)
                const sectionIDs = availableSections.map(section => section.id)
            
                if (availableSections.length > 0) {
                    setSectionIds(sectionIDs);
                    setSectionNames(sectionNames);
                    setSelectedSection(availableSections[0].section_name); // Set the first course as the selected section
                    setClassName(className);
                    console.log(selectedSection)
                } else {
                   
                    setSelectedSection("No section available"); // Reset or set to a default value
                }         
            
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchSections();
    }, []);

    

    useEffect(() => {
        const fetchDates = async () => {
            try {
                if (selectedSection) {

                    //const GET_DATE_API = `/api/courses/${courseId}/sections/${getSectionId(selectedSection)}/dates`
                    const GET_DATE_API = `${GET_DATE_API_BASE_URL}/${getSectionId(selectedSection)}`; // replace this this the above when running BE
                    const response = await axios.get(GET_DATE_API);

                    const data = response.data;
                    const availableDates = data.dates;

                    if (availableDates.length > 0) {
                        const date = availableDates[0];
                        setSelectedDate(dayjs(convertDateFormat(date))); // Assuming convertDateFormat is a function you've defined to format the date
                    } else {
                        setSelectedDate(dayjs());
                    }
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        fetchDates();
    }, [selectedSection]);



    useEffect(() => {
        const fetchStudents = async () => {
            try {

                if(selectedSection) {
                     //const GET_STATUSES_API = `/api/courses/${courseId}/sections/${getSectionId(selectedSection)}`
                     const GET_STATUSES_API = `${GET_STATUSES_API_BASE_URL}/${getSectionId(selectedSection)}`; // replace this this the above when running BE
                    
                     const response = await axios.get(GET_STATUSES_API, {
                        params: { date: selectedDate.format('DD-MM-YYYY') }
                    });

                     const data = response.data;
                     const newStudentList = data.flatMap(data => data.students);
                      
                    if (newStudentList.length > 0) {
                        setStudentList(newStudentList);
                    } else {
                        setStudentList([])
                    }   
                }              
            } catch (error) {
                console.error('Error fetching students: ', error);
                setStudentList([]); // In case of error, set student list to empty
            }
        };
    
        if (selectedSection) {
            fetchStudents();
        }
    }, [selectedSection, selectedDate]);


    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleSearchInputChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm.toLowerCase());
    };
    const filteredStudentList = searchTerm
        ? studentList.filter(student =>
            student.name.toLowerCase().includes(searchTerm)
          )
        : studentList;
        
    // Add a function to update the global status
    const handleGlobalStatusChange = (status) => {
        setGlobalStatus(status);
        console.log(status);
        // Optionally, update all students' status in the studentList
        const updatedStudents = studentList.map(student => {
            return { ...student, status: status };
        });
        setStudentList(updatedStudents);
        console.log(updatedStudents)
        // Here, you can also make an API call to update all students' statuses in the backend
    };

    return (
        
        <Box  className="frame">
            <SearchBar onSearchInputChange={handleSearchInputChange}/>
            
            <MarkAll onGlobalStatusChange={handleGlobalStatusChange}  />
            <Box  display="flex" alignItems="center" justifyContent="space-between" sx={{backgroundColor: "#154884", borderRadius: "0.5rem"}}>
                <Box sx={{width: "50%"}}>
                    <SectionPicker sections={sectionNames} selectedSection={selectedSection} onSectionChange={handleSectionChange}/>
                </Box>
                <Box sx={{width: "30%", padding: "0.5rem"}}>
                    <QRDatePicker onDateChange={handleDateChange} selectedDate={selectedDate}/>
                </Box>
            </Box>
            
            <Title/> 
            
            {(studentList.length != 0) && (
                <StudentList
                    studentList={filteredStudentList}
                    selectedSection={selectedSection}
                    classId={courseId}
                    globalStatus={globalStatus}
                />
            )}
        </Box>
    );
}

export default AttendanceCheck;
  