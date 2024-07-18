import React, { useEffect, useState } from 'react';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import useRoomSocket from '../../clientServices/RoomSocket.js';
import './DoctorPage.css';
import { getRoomById } from '../../clientServices/RoomService.js';
import EmergencyDoctorAlertModal from '../QueuesManagment/modals/EmergencyDoctorAlert.jsx';
import DeletePatientModal from '../QueuesManagment/modals/DeletePatient.jsx';


const DoctorPage = () => {
    const { id } = useParams();
    const [currentPatient, setCurrentPatient] = useState();
    const [nextPatient, setNextPatient] = useState();
    const { moveRoom, emergencyAlertToDoctor,endOfTreatment } = useRoomSocket(id, currentPatient, setCurrentPatient, nextPatient, setNextPatient);
    const [roomData, setRoomData] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete modal
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false); // State to manage the emergency modal

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

    //emergencyAlert
    const handleConfirmEmergencyModal = () => {
        emergencyAlertToDoctor(currentPatient.UniqueNumber, roomData.Name);
        alert('קריאת חירום נשלחה לרופא');
        handleCloseEmergencyModal();
    };

    const handleCloseEmergencyModal = () => {
        setIsEmergencyModalOpen(false);
    };

    const handleOpenEmergencyModal = () => {
        setIsEmergencyModalOpen(true);
    };

    //finish treatment
    const handleFinishTreatment = async () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDeleteModal = async () => {
        try {
            //await deletePatient(currentPatient.ID);
            endOfTreatment(currentPatient.ID);
            alert('הטיפול הסתיים בהצלחה');            
            handleCloseDeleteModal();
            
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient.');
        }
    };

    const roomButtons = [
        { roomId: 5, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לקבלה' },
        { roomId: 4, icon: <MonitorHeartIcon className='queueIcon' />, label: 'העבר לחדר אקג' },
        { roomId: 3, icon: <ZoomOutMapIcon className='queueIcon' />, label: 'העבר לחדר טריאג' },
        { roomId: 2, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לחדר טיפולים' },
        { roomId: 1, icon: <VaccinesIcon className='queueIcon' />, label: 'העבר לחדר רופא' },
    ];

    const anotherButtons = [
        { roomId: 1, icon: <CheckCircleIcon />, label: 'סיום טיפול', className: 'EndOfTreatment anotherButtons', onclick: handleFinishTreatment },
        { roomId: 2,  label: 'התראת חירום לרופא ', className: 'emergencyAlert anotherButtons', onclick: handleOpenEmergencyModal }
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
                <div className='allQueues'>
                    <div className='queuesList'>
                        {anotherButtons.map(button => (
                            button.Id !== parseInt(id) && (
                                <button key={button.Id} className={button.className} onClick={button.onclick}>
                                    {button.icon}
                                    <span>{button.label}</span>
                                </button>
                            )
                        ))}
                    </div>
                </div>
            </div>

            <DeletePatientModal
                open={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDeleteModal}
                patientName={currentPatient ? `${currentPatient.FirstName} ${currentPatient.LastName}` : ''}
            />

            <EmergencyDoctorAlertModal
                open={isEmergencyModalOpen}
                handleClose={handleCloseEmergencyModal}
                handleConfirm={handleConfirmEmergencyModal}
                patientName={currentPatient ? `${currentPatient.FirstName} ${currentPatient.LastName}` : ''}
                roomName={id ? roomData.Name : ''}
            />
        </div>

        
    );
};


export default DoctorPage;