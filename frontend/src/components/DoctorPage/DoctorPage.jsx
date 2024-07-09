import React from 'react';
import { useState, useEffect } from "react";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import socketIO from 'socket.io-client';
import './DoctorPage.css'

const DoctorPage = () => {
    const socket = socketIO("http://localhost:8000");
    const [currentPatient, setCurrentPatient] = useState([]);

    const moveRoom = (roomId) => {
        console.log("move room");
        const place = true;
        //to change it by the right place-  
        //the doctor can move to the beginning of the queue or just the secretary? and if true, how he can do it?
        socket.emit("moveClientToAnotherRoom", currentPatient, roomId, place);
    };

    socket.on("updateCurrentPatient", (newPatient) => {
        setCurrentPatient([currentPatient, newPatient]);
    });

    return (
        <div className='doctorPageContainer'>
            <div className='queuesCont'>
                <h2>חדר רופא</h2>
                <div className='queueDetails'>
                    <div className='currentPatient'>
                        <div className='patientNumber'>2</div>
                        <div className='patientName'>היוש</div>
                    </div>
                    <div className='nextPatient'>
                        <span className='queueDetTitle'>מטופל הבא: </span>
                        <div className='nextPatientName'>מה נשמע</div>
                    </div>
                </div>



                <div className='allQueues'>
                    <div className='queuesList'>
                        <button onClick={moveRoom(5)} className='moveQueue' >
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לקבלה</span>
                        </button>
                        <div className='moveQueue' >
                            <MonitorHeartIcon className='queueIcon' />
                            <span>העבר לחדר אקג</span>
                        </div>
                        <div className='moveQueue' >
                            <ZoomOutMapIcon className='queueIcon' />
                            <span>העבר לחדר טריאג</span>
                        </div>
                        <div className='moveQueue' >
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לחדר טיפולים</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DoctorPage;