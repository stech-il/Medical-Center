import React, { useState } from 'react';
import './QueuesManagmentPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NumbersIcon from '@mui/icons-material/Numbers';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import PatientsTable from './PatientsTable';
import RoomsTable from './RoomsTable';
import Sidebar from '../sidebar/sidebar';
import SelectRoom from './SelectRoom';
import { deletePatient } from '../../clientServices/PatientsService';
import DeletePatientModal from './modals/DeletePatient';
import EmergencyDoctorAlertModal from './modals/EmergencyDoctorAlert';
import AddPatientModal from './modals/AddNewPatient'; // Import the new modal
import useReceptionSocket from '../../clientServices/ReceptionSocket';

const QueueManagmentPage = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete modal
    const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false); // State to manage the emergency modal
    const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);

    const [patients, setPatients] = useState([]);

    const { moveRoom,emergencyAlertToDoctor } = useReceptionSocket(setSelectedPatient,patients,setPatients);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleMoveToEndOfQueue = async () => {
        if (selectedPatient && selectedRoom) {
            try {
                await moveRoom(selectedRoom.ID,selectedPatient.ID, true);
                alert('המטופל הועבר לסוף התור בהצלחה');
            } catch (error) {
                console.error('Error moving patient to end of queue:', error);
                alert('Failed to move patient to the end of the queue.');
            }
        } else {
            if (!selectedPatient) {
                alert('בחר מטופל');
            }
            if (!selectedRoom) {
                alert('בחר חדר');
            }
        }
    };

    const handleMoveToFrontOfQueue = async () => {
        if (selectedPatient && selectedRoom) {
            try {
                await moveRoom( selectedRoom.ID, selectedPatient.ID,false);
                alert('המטופל הועבר לתחילת התור בהצלחה');
                setSelectedPatient(null);
                setSelectedRoom(null);
            } catch (error) {
                console.error('Error moving patient to front of queue:', error);
                alert('Failed to move patient to the front of the queue.');
            }
        } else {
            if (!selectedPatient) {
                alert('בחר מטופל');
            }
            if (!selectedRoom) {
                alert('בחר חדר');
            }
        }
    };

    const handleFinishTreatment = async () => {
        if (selectedPatient) {
            setIsDeleteModalOpen(true);
        } else {
            alert('בחר מטופל');
        }
    };

    const handleOpenEmergencyModal = () => {
        if (selectedPatient && selectedRoom) {
            setIsEmergencyModalOpen(true);
        } else {
            alert('בחר מטופל וחדר');
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleCloseEmergencyModal = () => {
        setIsEmergencyModalOpen(false);
    };

    const handleConfirmDeleteModal = async () => {
        try {
            await deletePatient(selectedPatient.ID);
            alert('הטיפול הסתיים בהצלחה');
            setSelectedPatient(null);
            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete patient.');
        }
    };

    const handleConfirmEmergencyModal = () => {
        emergencyAlertToDoctor(selectedPatient.UniqueNumber,selectedRoom.Name);
        alert('קריאת חירום נשלחה לרופא');
        handleCloseEmergencyModal();
    };

    const handleOpenAddPatientModal = () => {
        setIsAddPatientModalOpen(true);
    };

    const handleCloseAddPatientModal = () => {
        setIsAddPatientModalOpen(false);
    };

    const handleAddPatient = (patient) => {
        alert(`מטופל חדש נוסף: ${patient.name}, קופת חולים: ${patient.hmo}`);
        // Add the logic to add the patient to the list
    };

    return (
        <>
            <div className='queueManagmentContainer'>
                <Sidebar />
                <div className='patientsDetailsTableContainer'>
                    <div className='managmentTitle'>מטופלים</div>
                    <div className='patientsDetailsTableCont'>
                        <div className='patientDetailsContainer'>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <PersonIcon className='detailTitle' />
                                    <div className='detailTitle'>שם מטופל</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? `${selectedPatient.FirstName} ${selectedPatient.LastName}` : '---'}
                                </div>
                            </div>

                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <ApartmentIcon className='detailTitle' />
                                    <div className='detailTitle'>קופת חולים</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? selectedPatient.HMO.Name : '---'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <NumbersIcon className='detailTitle' />
                                    <div className='detailTitle'>מספר מטופל</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? selectedPatient.UniqueNumber : '---'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <MeetingRoomIcon className='detailTitle' />
                                    <div className='detailTitle'>חדר</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient && selectedPatient.queues.length > 0 ? selectedPatient.queues[0].room.Name : '---'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <FormatListNumberedRtlIcon className='detailTitle' />
                                    <div className='detailTitle'>מיקום בתור</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient && selectedPatient.queues.length > 0 ? selectedPatient.queues[0].PriorityNumber : '---'}
                                </div>
                            </div>
                        </div>
                        <div className='tableAndOperationCont'>
                            <PatientsTable patients={patients} setPatients={setPatients} onSelectPatient={handleSelectPatient} />
                            <div className='operationCont'>
                                <div className='actionOfPatientContainer'>
                                    <div className='listOfRoomsContainer'>
                                        <SelectRoom onSelectRoom={setSelectedRoom} />
                                    </div>
                                    <button className='moveToRoomBtn' onClick={handleMoveToEndOfQueue}>
                                        העבר לסוף התור
                                    </button>
                                    <button className='moveToRoomBtn' onClick={handleMoveToFrontOfQueue}>
                                        העבר לראש התור
                                    </button>
                                </div>
                                <button className='finishTreatment' onClick={handleFinishTreatment}>
                                    <CheckCircleIcon />
                                    <div>סיום טיפול</div>
                                </button>
                            </div>

                            <div className='moreOperationCont'>
                                <div className='actionOfPatientContainer'>
                                    <button className='moreOperation'>
                                        פתיחת תור חירום
                                    </button>
                                    <button className='moreOperation' onClick={handleOpenAddPatientModal}>
                                        הוספת מטופל חדש
                                    </button>
                                    <button className='moreOperation' onClick={handleOpenEmergencyModal}>
                                        התראת חירום לרופא
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='roomsDetailsTableContainer'>
                    <div className='managmentTitle'>חדרים</div>

                    <RoomsTable />
                    <div className='moreOperationCont'>
                        <div className='actionOfPatientContainer'>
                            <button className='moreOperation'>מחיקת חדר</button>
                            <button className='moreOperation'>הוספת חדר</button>
                        </div>
                    </div>
                </div>
            </div>

            <DeletePatientModal
                open={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDeleteModal}
                patientName={selectedPatient ? `${selectedPatient.FirstName} ${selectedPatient.LastName}` : ''}
            />

            <EmergencyDoctorAlertModal
                open={isEmergencyModalOpen}
                handleClose={handleCloseEmergencyModal}
                handleConfirm={handleConfirmEmergencyModal}
                patientName={selectedPatient ? `${selectedPatient.FirstName} ${selectedPatient.LastName}` : ''}
                roomName={selectedRoom ? selectedRoom.Name : ''}
            />

            <AddPatientModal
                open={isAddPatientModalOpen}
                handleClose={handleCloseAddPatientModal}
                handleAddPatient={handleAddPatient}
            />
        </>
    );
};

export default QueueManagmentPage;
