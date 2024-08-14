import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Login from '../AdminPage/usersControl/Login'

import './HomePage.css'
const HomePage = () => {


  const navigate = useNavigate();

  const goToPagesNavigate = () => {
    navigate('/userLogin');
  };
  return (
    <>
      <div className='HomePageContainer'>
      <Login/>

        {/* <button className='pagesNavigate-btn' onClick={goToPagesNavigate}><ArrowBackIcon />
          <span className='pagesNavigate-text'>
            מכאן מתחילים
          </span>
        </button> */}
      </div>
    </>
  );
};

export default HomePage;
