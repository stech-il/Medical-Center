import React, { useState } from 'react';
import './QueuesManagmentPage.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NumbersIcon from '@mui/icons-material/Numbers';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import PatientsTable from './PatientsTable';
import Sidebar from '../sidebar/sidebar';
import SelectRoom from './SelectRoom';

const QueueManagmentPage = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <>
            <div className='queueManagmentContainer'>
                <Sidebar />
                <div className='patientsDetailsTableContainer'>
                    <div className='patientsDetailsTableCont'>
                        <div className='patientDetailsContainer'>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <PersonIcon className='detailTitle' />
                                    <div className='detailTitle'>שם מטופל</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? `${selectedPatient.FirstName} ${selectedPatient.LastName}` : 'N/A'}
                                </div>
                            </div>

                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <ApartmentIcon className='detailTitle' />
                                    <div className='detailTitle'>קופת חולים</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? selectedPatient.HMOid : 'N/A'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <NumbersIcon className='detailTitle' />
                                    <div className='detailTitle'>מספר מטופל</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient ? selectedPatient.UniqeNumber : 'N/A'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <MeetingRoomIcon className='detailTitle' />
                                    <div className='detailTitle'>חדר</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient && selectedPatient.queues.length > 0 ? selectedPatient.queues[0].room.Name : 'N/A'}
                                </div>
                            </div>
                            <div className='patientDetail'>
                                <div className='detailTitleContainer'>
                                    <FormatListNumberedRtlIcon className='detailTitle' />
                                    <div className='detailTitle'>מיקום בתור</div>
                                </div>
                                <div className='detailProperty'>
                                    {selectedPatient && selectedPatient.queues.length > 0 ? selectedPatient.queues[0].PariortyNumber : 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div className='tableAndOperationCont'>
                            <PatientsTable onSelectPatient={handleSelectPatient} />
                            <div className='operationCont'>
                                <div className='actionOfPatientContainer'>
                                    <div className='listOfRoomsContainer'>
                                        <SelectRoom />
                                    </div>
                                    <button className='moveToRoomBtn'>העבר לסוף התור</button>
                                    <button className='moveToRoomBtn'>העבר לראש התור</button>
                                </div>
                                <button className='finishTreatment'>
                                    <CheckCircleIcon />
                                    <div>סיום טיפול</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </>
    );
};

export default QueueManagmentPage;
