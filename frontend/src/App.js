import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminPage from './components/AdminPage/AdminPage';
import HomePage from './components/HomePage/HomePage';
import UsersControl from './components/AdminPage/usersControl/usersControl'
import UserLogin from './components/AdminPage/usersControl/usersLoginControl';
import PagesNavigation from './components/HomePage/pagesNavigate/pagesNavigate'
import PatientEnter from './components/PatientEnter/PatientEnter'
import DoctorPage from './components/DoctorPage/DoctorPage'
import MessagePage from './components/Messages/MessagePage'
import MonitorPage from './components/MonitorPage/MonitorPage';

import SignUp from './components/UserPage/UserSignUp';

import QueueManagmentPage from './components/QueuesManagment/QueuesManagmentPage';
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
          <Route path="/userLogin" element={<UserLogin />} />
          <Route path="/users" element={<UsersControl />} />
          <Route path="/patientEnter" element={<PatientEnter />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/monitor" element={<MonitorPage />} />
          <Route path="/createUser" element={<SignUp />} />

          <Route path="/QueueManagment" element={<QueueManagmentPage />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
