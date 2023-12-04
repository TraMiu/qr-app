import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import SessionInformation from './screens/startsession/index';
import Sidebar from './screens/global/Sidebar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <ButtonGroup/> */}
      <SessionInformation/>
    </BrowserRouter>
  </React.StrictMode>
);

