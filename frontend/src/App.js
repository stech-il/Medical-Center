import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './components/AdminPage/AdminPage';
import HomePage from './components/HomePage/HomePage';
import UsersControl from './components/AdminPage/usersControl/usersControl'
import PagesNavigation from './components/HomePage/pagesNavigate/pagesNavigate'
import PatientEnter from './components/PatientEnter/PatientEnter'
import DoctorPage from './components/DoctorPage/DoctorPage'
import logo from './logo.png'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='logoContainer'>
          <img src={logo} alt='logo' className='logoImg'></img>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pagesNavigate" element={<PagesNavigation />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/users" element={<UsersControl />} />
          <Route path="/patientEnter" element={<PatientEnter />} />
          <Route path="/doctorPage" element={<DoctorPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
