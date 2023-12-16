import "./style.css";
import { colors } from "../../theme";
import { useState } from 'react';
import ButtonGroup from "../../components/ButtonGroup";
import { IconButton } from "@mui/joy";
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography} from "@mui/material";


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

function Square() {
    return (
      <>
        <button className="square">X</button>
        <button className="square">X</button>
      </>
    );
}



const TeacherRecords = () => {
    
    return (
        
        <Box  className="frame">
            <SearchBar/>
            <Typography variant="h4" marginTop="1.5rem" align="center" gutterBottom >
                Attendance Record
            </Typography>

            <Box className="grid">
            <Square></Square>
            </Box>
        </Box>
    );
}

export default TeacherRecords;