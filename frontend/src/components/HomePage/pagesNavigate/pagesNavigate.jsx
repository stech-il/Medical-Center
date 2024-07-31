import React, { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';

import './pagesNavigate.css'
const PagesNavigation = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
        try {
            const response = await getAllRooms();
            setRooms(response.data); 
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    fetchRooms();
}, []);


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

  const goToDoctorPage = (id) => {
    navigate(`/doctorPage/${id}`);
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
        <button onClick={()=>goToDoctorPage(5)} className='page-btn'>קבלה</button>
        <button onClick={()=>goToDoctorPage(1)} className='page-btn'>חדר רופא</button>
        <button onClick={()=>goToDoctorPage(3)} className='page-btn'>חדר טריאג</button>
        <button onClick={()=>goToDoctorPage(2)} className='page-btn'>חדר טיפולים</button>
        <button onClick={()=>goToDoctorPage(4)} className='page-btn'>חדר אקג</button>
      </div>
    </div>
    </>
  );
};

export default PagesNavigation;



