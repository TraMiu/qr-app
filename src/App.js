
import { CssBaseline} from "@mui/material";

import Sidebar from "./screens/global/Sidebar"


import Dashboard from "./screens/dashboard";
import AttendanceCheck from "./screens/attendance-check";
import TeacherRecords from "./screens/teacher-record";
import { Route, Routes } from "react-router-dom";
import SessionInformation from "./screens/start-session";

import QRCodeComponent from "./screens/qr-checkin";
import StudentRecords from "./screens/student-records";



function App({role, userId, courseId}) {
  
  const teacherRole = (role == "teacher"); 

  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar teacher={teacherRole} />

        <main className="content">
          {/* <Topbar/> */}
          <Routes>
            <Route path="/" element={<SessionInformation />} />
            <Route path="/checkin" element={<SessionInformation />} />
            <Route path="/edit" element={<AttendanceCheck />} />
            <Route path="/records" element={<StudentRecords />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;