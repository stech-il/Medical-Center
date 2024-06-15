import React from 'react';
import { useNavigate } from 'react-router-dom';

import './pagesNavigate.css'
const PagesNavigation = () => {

  
  const navigate = useNavigate();

  const goToAdminPage = () => {
    navigate('/admin');
  };

  const goToPatientEnterPage = () => {
    navigate('/patientEnter');
  };

  const goToDoctorPage = () => {
    navigate('/doctorPage');
  };
  return (
    <>
    <div className='pagesContainer'>
      <h2>בחר עמוד</h2>
      <div className='pagesBtnsContainer'>
        <button onClick={goToAdminPage} className='page-btn'>מנהל</button>
        <button onClick={goToPatientEnterPage} className='page-btn'>תור חדש</button>
        <button className='page-btn'>מוניטור</button>
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



