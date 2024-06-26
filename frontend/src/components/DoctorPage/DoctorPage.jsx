import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import useSocket from '../../clientServices/socketService.js';  // Import the custom hook
import './DoctorPage.css';

const DoctorPage = () => {
    const { currentPatient,nextPatient, moveRoom } = useSocket(1);

    return (
        <div className='doctorPageContainer'>
            <div className='queuesCont'>
                <h2>חדר רופא</h2>
                <div className='queueDetails'>
                    <div className='currentPatient'>
                        <div className='patientNumber'>{currentPatient.UniqueNumber}</div>
                        <div className='patientName'>{currentPatient.FirstName} {currentPatient.LastName}</div>
                    </div>
                    <div className='nextPatient'>
                        <span className='queueDetTitle'>מטופל הבא </span>
                        <div className='nextPatientNumber'>{nextPatient.UniqueNumber} : {nextPatient.FirstName} {nextPatient.LastName}</div>
                        
                    </div>
                </div>

                <div className='allQueues'>
                    <div className='queuesList'>
                        <button onClick={() => moveRoom(5)} className='moveQueue'>
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לקבלה</span>
                        </button>
                        <button onClick={() => moveRoom(4)} className='moveQueue'>
                            <MonitorHeartIcon className='queueIcon' />
                            <span>העבר לחדר אקג</span>
                        </button>
                        <button onClick={() => moveRoom(3)} className='moveQueue'>
                            <ZoomOutMapIcon className='queueIcon' />
                            <span>העבר לחדר טריאג</span>
                        </button>
                        <button onClick={() => moveRoom(2)} className='moveQueue'>
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לחדר טיפולים</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorPage;