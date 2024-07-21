import React, { useState } from 'react';
import axios from 'axios';
import './PatientEnter.css';
import doctorImg from '../../doctor.png'

const PatientEnter = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    const [patientClinic, setPatientClinic] = useState('');
    const [newPatient, setNewPatient] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [currentTime, setCurrentTime] = useState('');

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

        const apiUrl = 'http://localhost:8000/patients'; // Update the API URL
        const requestData = {
            firstName,
            lastName,
            identityNumber,
            HMOid: 1, // Replace with actual HMO id
            phone: '1234567890', // Replace with actual phone number
            Tz:123456789
        };

        axios.post(apiUrl, requestData)
            .then(response => {
                setNewPatient(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });

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
        }, 11000);
    };

    return (
        <>
            <div className='patientEnterCont' >
            <img src={doctorImg} alt='doctor' className='doctorImg'></img>

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
                                    {['מכבי', 'מאוחדת', 'כללית', 'לאומית', 'אחר'].map((clinic) => (
                                        <button
                                            key={clinic}
                                            className='clinic'
                                            onClick={() => handleClinicSelection(clinic)}
                                        >
                                            {clinic}
                                        </button>
                                    ))}
                                    <button className='continueBtn' onClick={handleClinicSubmit}>
                                        אישור
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className='numberNote'>
                                <div className='patientInfo'>
                                    <div className='numberCont'>
                                        <div>מספרך בתור:</div>
                                        <div className='uniqueNumber'>
                                            {newPatient.UniqeNumber}
                                        </div>
                                    </div>
                                    <div className='moreDetails'>שם: {`${newPatient.FirstName} ${newPatient.LastName}`}</div>
                                    <div className='moreDetails'>קופת חולים: {patientClinic}</div>
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