import React, { useState ,useEffect} from 'react';
import './PatientEnter.css';
import useSocket from "../../clientServices/PatientSocket.js";
import {getAllHMOs} from "../../clientServices/HmosService.js";

//import doctorImg from '../../doctor.png'

const PatientEnter = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [patientClinic, setPatientClinic] = useState('');
    const [newPatient, setNewPatient] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [currentTime, setCurrentTime] = useState('');
    const [clinicsList,setClinicsList]=useState([]);
    const [patientDetails,setPatientDetails]=useState({});
    const {insertPatient}=useSocket(setPatientDetails);

    const hebrewCharacters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל', 'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'];
    const numberCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const handleKeyPress = (key, setState) => {
        if (key === 'x') {
            // Delete the last character
            setState((prev) => prev.slice(0, -1));
        } else {
            // Append the character
            setState((prev) => prev + key);
        }
    };

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await getAllHMOs();
                setClinicsList( response.data);
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchClinics();
    },[]
    );

    const handleSubmitStep1 = () => {
        if (firstName.trim() === '') {
            alert('Please enter first name');
            return;
        }
        setCurrentStep(2);
    };

    const handleSubmitStep2 = () => {
        if (lastName.trim() === '') {
            alert('Please enter last name');
            return;
        }
        setCurrentStep(3);
    };

    const handleSubmitStep3 = () => {
        if (identityNumber.trim() === '') {
            alert('Please enter identity number');
            return;
        }
        setCurrentStep(4);
    };

    const handleClinicSelection = (selectedClinic) => {
        setPatientClinic(selectedClinic);
    };

    const handleClinicSubmit = () => {
        if (patientClinic === '') {
            alert('Please choose an HMO');
            return;
        }

        insertPatient(firstName,lastName,patientClinic,"0236232732",identityNumber);

        setCurrentStep(5);

        function padTo2Digits(num) {
            return String(num).padStart(2, '0');
        }

        const now = new Date();
        const currentTime = padTo2Digits(now.getHours()) + ':' + padTo2Digits(now.getMinutes());

        setCurrentTime(currentTime);

        // Reset the state after 10 seconds
        setTimeout(() => {
            setFirstName('');
            setLastName('');
            setIdentityNumber('');
            setPatientClinic('');
            setNewPatient({});
            setCurrentStep(1);
        }, 40000);
    };

    return (
        <>
            <div className='patientEnterCont' >
            {/* <img src={doctorImg} alt='doctor' className='doctorImg'></img> */}

                <div className='enterBoardCont'>
                    <div className='enterBoard'>
                        {currentStep === 1 && (
                            <div className='insertName'>
                                <input
                                    placeholder="הכנס שם פרטי"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className='inputNameBtn'
                                />
                                <div className='virtualKeyboard'>
                                    {[...hebrewCharacters].map((key) => (
                                        <button
                                            key={key}
                                            className='keyboard'
                                            onClick={() => handleKeyPress(key.toString(), setFirstName)}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        className='spaceBtn'
                                        onClick={() => handleKeyPress(' ', setFirstName)}
                                        key={' '}
                                    >
                                        רווח
                                    </button>
                                    <button
                                        className='keyboard deletePrevBtn'
                                        onClick={() => handleKeyPress('x', setFirstName)}
                                        key={'x'}
                                    >
                                        מחק
                                    </button>
                                </div>
                                <button className='continueBtn' onClick={handleSubmitStep1}>
                                    המשך
                                </button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className='insertName'>
                                <input
                                    placeholder="הכנס שם משפחה"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className='inputNameBtn'
                                />
                                <div className='virtualKeyboard'>
                                    {[...hebrewCharacters].map((key) => (
                                        <button
                                            key={key}
                                            className='keyboard'
                                            onClick={() => handleKeyPress(key.toString(), setLastName)}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        className='spaceBtn'
                                        onClick={() => handleKeyPress(' ', setLastName)}
                                        key={' '}
                                    >
                                        רווח
                                    </button>
                                    <button
                                        className='keyboard deletePrevBtn'
                                        onClick={() => handleKeyPress('x', setLastName)}
                                        key={'x'}
                                    >
                                        מחק
                                    </button>
                                </div>
                                <button className='continueBtn' onClick={handleSubmitStep2}>
                                    המשך
                                </button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className='insertIdentityNumber'>
                                <input
                                    placeholder="הכנס מספר זהות"
                                    type="text"
                                    value={identityNumber}
                                    onChange={(e) => setIdentityNumber(e.target.value)}
                                    className='inputNameBtn'
                                />
                                <div className='virtualKeyboard'>
                                    {[...numberCharacters].map((key) => (
                                        <button
                                            key={key}
                                            className='keyboard'
                                            onClick={() => handleKeyPress(key.toString(), setIdentityNumber)}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        className='keyboard deletePrevBtn'
                                        onClick={() => handleKeyPress('x', setIdentityNumber)}
                                        key={'x'}
                                    >
                                        מחק
                                    </button>
                                </div>
                                <button className='continueBtn' onClick={handleSubmitStep3}>
                                    המשך
                                </button>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className='insertClinic'>
                                <div className='inputClinicBtn'>בחר קופת חולים</div>
                                <div className='allClinic'>
                                    {clinicsList.map((clinic) => (
                                        <button
                                            key={clinic.ID}
                                            className='clinic'
                                            onClick={() => handleClinicSelection(clinic.ID)}
                                        >
                                            {clinic.Name}
                                        </button>
                                    ))}
                                    <button className='continueBtn' onClick={handleClinicSubmit}>
                                        אישור
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 &&  (
                            <div className='numberNote'>
                                <div className='patientInfo'>
                                    <div className='numberCont'>
                                        <div>מספרך בתור:</div>
                                        <div className='uniqueNumber'>
                                            {patientDetails.UniqueNumber}
                                        </div>
                                    </div>
                                    <div className='moreDetails'>שם: {`${patientDetails.FirstName} ${patientDetails.LastName}`}</div>
                                    <div className='moreDetails'>קופת חולים: {patientDetails?.HMO?.Name || ''}</div>
                                    <div className='moreDetails'>שעה: {currentTime}</div>
                                </div>
                                <div className='saveNumber'>
                                    יש לשמור את המספר לאורך הטיפול
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientEnter;