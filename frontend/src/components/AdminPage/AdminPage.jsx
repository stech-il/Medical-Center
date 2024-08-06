import React from 'react';
import SidebarMenu from '../sidebar/sidebar'
import './AdminPage.css'
const AdminPage = () => {

    const role = location.state;

    return (
        <>
            <div className='AdminPageContainer' style={{ direction:"rtl" }}>
                <SidebarMenu />
                <div>ניהול מערכת</div>
                <div>
                    <div>עדכון אחרון</div>
                    <div>15-02-2024 14:32</div>
                </div>
            </div>
        </>

    );
};

export default AdminPage;
