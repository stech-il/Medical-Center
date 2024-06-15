import React from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import './DoctorPage.css'

const DoctorPage = () => {   

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
                        <div className='moveQueue' >
                            <VaccinesIcon className='queueIcon' />
                            <span>העבר לקבלה</span>
                        </div>
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

















