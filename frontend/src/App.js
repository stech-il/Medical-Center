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
<<<<<<< HEAD
<<<<<<< HEAD

import SignUp from './components/UserPage/UserSignUp';

=======
import QueueManagmentPage from './components/QueuesManagment/QueuesManagmentPage';
>>>>>>> fe450d3df42f489446ee3082a1c8ec439961f97b
=======

import SignUp from './components/UserPage/UserSignUp';

import QueueManagmentPage from './components/QueuesManagment/QueuesManagmentPage';
>>>>>>> 781da7f9151a257bf5d05c6b4e5e598f3e1100f1
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
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="/createUser" element={<SignUp />} />

=======
          <Route path="/QueueManagment" element={<QueueManagmentPage />} />
>>>>>>> fe450d3df42f489446ee3082a1c8ec439961f97b
=======
          <Route path="/createUser" element={<SignUp />} />

          <Route path="/QueueManagment" element={<QueueManagmentPage />} />
>>>>>>> 781da7f9151a257bf5d05c6b4e5e598f3e1100f1
        </Routes>

      </div>
    </Router>
  );
}

export default App;
