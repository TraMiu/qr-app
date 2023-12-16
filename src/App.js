
import { CssBaseline} from "@mui/material";

import Sidebar from "./screens/global/Sidebar"


import Dashboard from "./screens/dashboard";
import AttendanceCheck from "./screens/attendance-check";
import TeacherRecords from "./screens/teacher-record";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar/calendar";
import { Route, Routes } from "react-router-dom";
import SessionInformation from "./screens/start-session";

import QRCodeComponent from "./screens/qr-checkin";



function App() {
  return (    
      <>
        <CssBaseline/>
        <div className="app">
          <Sidebar/>

          <main className="content">
            {/* <Topbar/> */}
            <Routes>
              <Route path="/" element={<SessionInformation/>} />
              <Route path="/checkin" element={<QRCodeComponent/>} />
              <Route path="/edit" element={<AttendanceCheck/>} />
              <Route path="/records" element={<TeacherRecords/>} />
              {/* <Route path="/form" element={<Form />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              {/* <Route path="/pie" element={<Pie />} /> */}
              {/* <Route path="/line" element={<Line />} /> */}
              {/* <Route path="/faq" element={<FAQ />} /> */}
              {/* <Route path="/calendar" element={<Calendar />} /> */}
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </>
      
    
  );
}

export default App;
