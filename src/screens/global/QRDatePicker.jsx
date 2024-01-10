
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';



export default function QRDatePicker({ onDateChange = {} }) {
    return (
      
      <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth="1">
        <DatePicker 
          format="DD-MM-YYYY"
          defaultValue={dayjs()}
          onChange={(newValue) => {
            onDateChange(dayjs(newValue)); // Call the handler with the new date
          }}
          slotProps={{ textField: { size: 'small', fullWidth: "true"}}}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#154884', // Change border color
              borderWidth: '1px', // Make border bold
              borderRadius: "2rem"
            },
            '& .MuiSvgIcon-root': {
              color: '#154884', // Change arrow color
            },
            '& .MuiInputBase-input': {
              color: '#154884', // Change text color
              fontWeight: 'bold' // Make text bold
            },
            backgroundColor: "white",
            borderRadius: "2rem",
          }}
        />
      </LocalizationProvider>
    )
  }