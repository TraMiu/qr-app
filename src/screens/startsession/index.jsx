import { useState } from 'react';
import "./style.css";

const SessionInformation = ({ courses = ["Course A", "Course B"] }) => {
 
  const offset = 7; // GMT+7
  const now = new Date(new Date().getTime() + offset * 3600 * 1000);
  const currentDate = now.toISOString().split('T')[0];
  const [selectedCourse, setSelectedCourse] = useState('');
  const [customCourse, setCustomCourse] = useState('');
  const [sessionDate, setSessionDate] = useState(currentDate);

  const handleCourseChange = (event) => {
    if (event.target.value === "custom") {
      // If the custom option is selected, focus on the custom course input
      document.getElementById('custom-course-input').focus();
    } else {
      setSelectedCourse(event.target.value);
    }
  };

  const addCourseToList = () => {
    if (customCourse) {
      // Add the custom course to the database here
      // For now, we'll just set it as the selected course
      setSelectedCourse(customCourse);
    }
  };

  return (
    <div className="session-info-container">
      <h2>Session Information</h2>
      <div className="section">
        <h3>Check In</h3>
        <p>Starting students check-in will allow students to check-in on their own devices, but will prevent you from manually taking attendance.</p>
        <ul>
          <li>A dynamic QR code will be generated on the next screen that students will need to scan. This code will changes every 5 seconds.</li>
          <li>Students will have 2 minutes to check-in before the check-in period will automatically close.</li>
        </ul>
      </div>
      <div className="section">
        <h3>Course</h3>
        <select value={selectedCourse} onChange={handleCourseChange} >
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <input 
          id="custom-course-input"
          type="text"
          value={customCourse}
          onChange={e => setCustomCourse(e.target.value)}
          onBlur={addCourseToList}
          placeholder="Type to add a new course"
        />
      </div>
      <div className="section">
        <h3>Session Date</h3>
        <input
          type="date"
          value={sessionDate}
          onChange={e => setSessionDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SessionInformation;
