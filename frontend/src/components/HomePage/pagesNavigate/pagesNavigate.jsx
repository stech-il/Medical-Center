import React from 'react';
import { useNavigate } from 'react-router-dom';

import './pagesNavigate.css'
const PagesNavigation = () => {

  
  const navigate = useNavigate();

  const goToAdminPage = () => {
    navigate('/admin');
  };

  const goToUserLoginPage = () => {
    navigate('/userLogin');
  }

  const goToPatientEnterPage = () => {
    navigate('/patientEnter');
  };

  const goToDoctorPage = () => {
    navigate('/doctorPage');
  };
        
  const goToMonitorPage = () => {
    navigate('/monitor');
  };
  return (
    <>
    <div className='pagesContainer'>
      <h2>בחר עמוד</h2>
      <div className='pagesBtnsContainer'>
        <button onClick={goToAdminPage} className='page-btn'>מנהל</button>
        <button onClick={goToUserLoginPage} className='page-btn'>כניסת משתמש</button>
        <button onClick={goToPatientEnterPage} className='page-btn'>תור חדש</button>
        <button className='page-btn' onClick={goToMonitorPage}>מוניטור</button>
        <button className='page-btn'>קבלה</button>
        <button onClick={goToDoctorPage} className='page-btn'>חדר רופא</button>
        <button className='page-btn'>חדר טריאג</button>
        <button className='page-btn'>חדר טיפולים</button>
        <button className='page-btn'>חדר אקג</button>
      </div>
    </div>
    </>
  );
};

export default PagesNavigation;



