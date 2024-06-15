import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonitorIcon from '@mui/icons-material/Monitor';

import './sidebar.css'
function SidebarMenu() {
    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };



    const navigate = useNavigate();

    const goToUsersPage = () => {
      navigate('/users');
    };

    return (
        <div className='sidebarContainer'>
        <Sidebar className='sidebar' rtl={true} collapsed={collapsed} style={{ height: "100vh" }}>
            <Menu >
                <MenuItem icon={<Home className='icon' />} >בית</MenuItem>
                <MenuItem icon={<PeopleAltIcon className='icon' />}onClick={goToUsersPage}>משתמשים</MenuItem>
                <MenuItem icon={<MeetingRoomIcon className='icon' />}>ניהול תורים</MenuItem>
                <MenuItem icon={<MessageIcon className='icon' />}>הודעות</MenuItem>
                <MenuItem icon={<AssessmentIcon className='icon' />}>ניתוח נתונים</MenuItem>
                <MenuItem icon={<MonitorIcon className='icon' />}>מוניטור</MenuItem>
            </Menu>
            <button className='menu-btn' onClick={handleToggleSidebar}>תפריט</button>
        </Sidebar>
        </div>
    );
}

export default SidebarMenu;