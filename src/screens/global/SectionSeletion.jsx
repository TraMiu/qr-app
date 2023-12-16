// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export default function SectionSelection({courses = ["section 1", "section 2"], selectedSection="ahi"}) {
//   const [section, setAge] = React.useState({selectedSection});

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Age</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={section}
//           label="Section"
//           onChange={handleChange}
//         >
//             {courses.map(course => (
//             <MenuItem value={course}>{course}</MenuItem>
//             ))}
          
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SectionSelection({ courses = ["1", "2"], selectedSection = "3"}) {

  const [section, setSection] = React.useState(selectedSection);

  const handleChange = (event) => {
    setSection(event.target.value);
  };

  console.log(selectedSection);

  return (
    
      <FormControl sx={{ m: 1, minWidth: "10rem" }} size="small" >
        <InputLabel id="demo-simple-select-label" sx={{
          color: '#154884', // Change the color of the label
          fontWeight: 'bold', // Make the label bold
          fontSize: '1.1rem', // Increase the size of the label
        }}>Section</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         
          value={section}
          label="Section"
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#154884', // Change border color
              borderWidth: '2px', // Make border bold
            },
            '& .MuiSvgIcon-root': {
              color: '#154884', // Change arrow color
            },
            '& .MuiSelect-select': {
              color: '#154884', // Change text color
              fontWeight: 'bold', // Make text bold
            },
          }}
     
        >
          {courses.map((course, index) => (
            <MenuItem key={index} value={course}>{course}</MenuItem>
          ))}
        </Select>
      </FormControl>

  );
}
