import React from 'react';
import SidebarMenu from '../sidebar/sidebar'
import './AdminPage.css'
import { Navigate, useLocation } from 'react-router-dom';
const AdminPage = () => {

    const location = useLocation();
    const role = location.state;

    return (
        <>
            {sessionStorage.getItem('email') && (<div className='AdminPageContainer' style={{ direction: "rtl" }}>
                <SidebarMenu role={role} />
                <div>ניהול מערכת</div>
                <div>
                    <div>עדכון אחרון</div>
                    <div>15-02-2024 14:32</div>
                </div>
            </div>)}
            {sessionStorage.getItem('email') ? (
                        <div className='AdminPageContainer' style={{ direction: "rtl" }}>
                        <SidebarMenu role={role} />
                        <div>ניהול מערכת</div>
                        <div>
                            <div>עדכון אחרון</div>
                            <div>15-02-2024 14:32</div>
                        </div>
                    </div>
                    ) : (
                        Navigate('/userLogin')
                    )}
        </>

    );
};

export default AdminPage;
