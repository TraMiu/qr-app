

import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";



import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";


import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AttendanceButtons from "../../components/ButtonGroup";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
    
      sx={{
        "& .pro-sidebar-inner": {
            background: `#154884 !important`,
        },
        "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
            color: "#abbdd3 !important",
        },
        "& .pro-menu-item.active": {
            color: "#FFFFFF !important",
            textDecoration: "underline",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 5px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="right"
                alignItems="center"
                
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="100px" mt="48px">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                        alt="vinuni-logo"
                        width="136px"
                        height="84px"
                        src={`../../assets/logo.png`}
                        style={{ cursor: "pointer"}}
                    />
                </Box>

            </Box>
            )}

            {!isCollapsed && (
                <Typography
                    variant="h6"
                    color='#e3e9f0'
                    paddingLeft="15%"
                    fontSize="18px"
                    fontWeight="bold"
                >
                        Attendance
                </Typography>
            )}

          <Box 
            paddingLeft={isCollapsed ? undefined : "15%"}
            mb="5px"          
          >

            <Item
              title="QR Check-in"
              to="/checkin"
              icon={<QrCode2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Edit Attendance"
              to="/edit"
              icon={<EditNoteOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
              
            />
            
          </Box>
          <Box paddingLeft={isCollapsed ? "0%" : "5%"} >
          <Item
              title="Records"
              to="/records"
              icon={<ContentPasteSearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
              
              
            />
          </Box>

          <Box paddingLeft={isCollapsed ? "0%" : "17%"}  mt={isCollapsed ? "0%" : "50%"}>
            <Item
                title="About Us"
                to="/settings"
                icon={<InfoOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                alignSelf="flex-end"
            />
          </Box>

          
          
          
        </Menu>
       
      </ProSidebar>
      <AttendanceButtons/>
    </Box>
  );
};

export default Sidebar;