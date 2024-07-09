import React, { useEffect, useState } from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { useParams } from 'react-router-dom';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import useRoomSocket from '../../clientServices/RoomSocket.js'; 
import './DoctorPage.css';
import { getRoomById } from '../../clientServices/RoomService.js';

const DoctorPage = () => {
    const { id } = useParams();
    const [currentPatient, setCurrentPatient] = useState();
    const [nextPatient, setNextPatient] = useState();
    const { moveRoom } = useRoomSocket(id,currentPatient,setCurrentPatient,nextPatient,setNextPatient);
    const [roomData, setRoomData] = useState({});

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await getRoomById(id);
                setRoomData(response.data); 
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRoomData();
    }, [id]);

    const roomButtons = [
        { roomId: 5, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לקבלה' },
        { roomId: 4, icon: <MonitorHeartIcon className='queueIcon' />, label: 'העבר לחדר אקג' },
        { roomId: 3, icon: <ZoomOutMapIcon className='queueIcon' />, label: 'העבר לחדר טריאג' },
        { roomId: 2, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לחדר טיפולים' },
        { roomId: 1, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לחדר רופא' },
    ];

    return (
        <div className='doctorPageContainer'>
            <div className='queuesCont'>
                <h2>חדר {roomData.Name}</h2>
                <div className='queueDetails'>
                    <div className='currentPatient'>
                        {currentPatient ? (
                            <>
                                <div className='patientNumber'>{currentPatient.UniqueNumber}</div>
                                <div className='patientName'>{currentPatient.FirstName} {currentPatient.LastName}</div>
                            </>
                        ) : (
                            <div className='noPatientMessage'>אין מטופל בחדר כרגע</div>
                        )}
                    </div>
                    <div className='nextPatient'>
                        {nextPatient ? (
                            <>
                                <span className='queueDetTitle'>מטופל הבא </span>
                                <div className='nextPatientNumber'>{nextPatient.UniqueNumber} : {nextPatient.FirstName} {nextPatient.LastName}</div>
                            </>
                        ) : (
                            <div className='noNextPatientMessage'>אין ממתינים</div>
                        )}
                    </div>
                </div>

                <div className='allQueues'>
                    <div className='queuesList'>
                        {roomButtons.map(button => (
                            button.roomId !== parseInt(id) && (
                                <button key={button.roomId} onClick={() => moveRoom(button.roomId)} className='moveQueue'>
                                    {button.icon}
                                    <span>{button.label}</span>
                                </button>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DoctorPage;