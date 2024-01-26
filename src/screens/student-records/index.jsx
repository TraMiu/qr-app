import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import Divider from '@mui/material/Divider';
import "./style.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

function sumArrayElements(arr) {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function getCurrentAttendance(arr) {
    return ((arr[1] * 0.8 + arr[2])/sumArrayElements(arr) * 100).toFixed(1);
}

function Chart({summary}) {
    // Assuming the dimensions of the PieChart are fixed (300x300 for example)
    const size = 300; // Size of the PieChart
    const labelPosition = size / 2; // Center of the PieChart
    const data = summary;
    

    return (
        <Box position="relative" height={size} width={size}>
            <PieChart
                series={[
                    {
                        data: [{ value: data.absent, color: '#E30000' }, { value: data.late, color: '#FDAF06' }, { value: data.present, color: '#29F527' }],
                        innerRadius: 60,
                        outerRadius: 100,
                        paddingAngle: 0,
                        cornerRadius: 0,
                        cx: labelPosition,
                        cy: labelPosition,
                    }
                ]}
                width={size}
                height={size}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                style={{
                    transform: 'translate(-50%, -50%)',
                }}
            >   
                <Box>
                    <Typography variant="h4" align="center" fontWeight="bold">{sumArrayElements(Object.values(data))}</Typography>
                    <Typography variant="h7" align="center">Days Total</Typography>
                </Box>
                
            </Box>
        </Box>
    );
}



function AttendanceSummary({summary}) {

    const data = summary;

    return (
        <Box 
            display="flex" alignItems="center" justifyContent="space-evenly" 
            sx={{
                height: '35%',
                width: '100%',
            }}
        >   
            <Box display="flex" alignItems="center" justifyContent="center">
                <Chart summary={summary}/>
                <Box >
                    <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" component="span" sx={{ color: '#E30000', marginRight: "0.5rem"}}>●</Typography><Typography variant="body1"><span style={{fontWeight: 'bold'}}>{data[0]}</span> Absent Days</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" component="span" sx={{ color: '#FDAF06', marginRight: "0.5rem"}}>●</Typography> <Typography variant="body1"><span style={{fontWeight: 'bold'}}>{data[1]}</span> Late Days</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" component="span" sx={{ color: '#29F527', marginRight: "0.5rem"}}>●</Typography> <Typography variant="body1"><span style={{fontWeight: 'bold'}}>{data[2]}</span> Present Days</Typography>
                    </Box>
                </Box>
            </Box>

            <Box>
                <Typography variant="h1" align="left" fontWeight="bold">{getCurrentAttendance(Object.values(data))}%</Typography>
                <Typography variant="h5" align="left">Current Attendance</Typography>
            </Box>

            
        </Box>
    )
}


function Row({records, index}) {
    const data = records[index];

    let statusColor;

    if (data.status === "Absent") {
        statusColor = '#E30000'; // Red for 'Absent'
    } else if (data.status === "Late") {
        statusColor = '#FDAF06'; // Green for 'Present'
    } else if (data.status === "Present") {
        statusColor = '#29F527'; // Orange for 'Late'
    }

    const calculateRollingAttendance = (currentIndex) => {
        const sumAttendance = records.slice(0, currentIndex + 1).reduce((sum, record) => sum + record.attendance, 0);
        return ((sumAttendance / (currentIndex + 1)) * 100).toFixed(0) + '%';
    };

    return (
    
        <Box justifyContent="center" alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                
                <Typography variant="h3" compon
                ent="span" sx={{ color: statusColor, marginRight: "0.5rem"}}>●</Typography>
              
                <Box sx={{width: "20%"}}>
                    <Typography variant="h5">{data.date}</Typography>
                </Box>
                <Box sx={{width: "20%"}}>
                    <Typography variant="h5">{data.day}</Typography>
                </Box>
                <Box sx={{width: "20%"}}>
                    <Typography variant="h5">{data.status}</Typography>
                </Box>
                <Box sx={{width: "20%"}}>
                    <Typography variant="h5">{calculateRollingAttendance(index)}</Typography>
                </Box>
                
            </Box>
            <Divider sx={{ borderBottomWidth: 3 }}/>
        </Box>
            
    )
}

function AttendanceList({attendanceRecords}) {

    const listItems = attendanceRecords.map((date, index) =>
        <Row index={index} records={attendanceRecords} />
    );
    
    return (
        <Box style={{maxHeight: '28rem', overflow: 'auto', width: "90%"}} marginLeft="5%">
            {listItems}
        </Box>
    );
}


export default function StudentRecords({role, userId, courseId}) {

    const [attendanceRecords, setAttendanceRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:3001/attendanceRecords');
                setAttendanceRecords(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchRecords();
    }, []);

    
    // Function to calculate the records summary
    const recordsSummary = (records) => {
        const summary = records.reduce((acc, record) => {
            if (record.status === 'Present') {
                acc.present += 1;
            } else if (record.status === 'Absent') {
                acc.absent += 1;
            } else if (record.status === 'Late') {
                acc.late += 1;
            }   
            return acc;
        }, { present: 0, absent: 0, late: 0 });

        return summary;
    };

    // Calculate the summary of attendance records
    const summary = recordsSummary(attendanceRecords);

    return (
        <Box>
            <AttendanceSummary summary={summary}/>
            <AttendanceList attendanceRecords={attendanceRecords}/>
        </Box>
    );
}