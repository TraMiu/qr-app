
import { CssBaseline} from "@mui/material";
import Sidebar from "./screens/global/Sidebar"
import AttendanceCheck from "./screens/attendance-check";
import { Route, Routes } from "react-router-dom";
import SessionInformation from "./screens/start-session";
import StudentRecords from "./screens/student-records";



function App({role, userId, courseId}) {
  
  const teacherRole = (role == "Instructor"); 

  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar teacher={teacherRole} />

        <main className="content">
          {/* <Topbar/> */}
          <Routes>
            <Route path="/" element={teacherRole? <SessionInformation role={role} userId={userId} courseId={courseId}/> : <StudentRecords role={role} userId={userId} courseId={courseId}/>} /> 
            <Route path="/checkin" element={<SessionInformation role={role} userId={userId} courseId={courseId}/>} />
            <Route path="/edit" element={<AttendanceCheck role={role} userId={userId} courseId={courseId} />} />
            <Route path="/records" element={<StudentRecords role={role} userId={userId} courseId={courseId}/>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;