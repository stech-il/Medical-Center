import React, { useState } from 'react';
import './PatientEnter.css';

const PatientEnter = () => {
    const [patientName, setPatientName] = useState('');
    const [patientClinic, setPatientClinic] = useState('');
    const [newPatient, setNewPatient] = useState([]);
    const [isConfirmationPressed1, setIsConfirmationPressed1] = useState(true);
    const [isConfirmationPressed2, setIsConfirmationPressed2] = useState(false);
    const [isConfirmationPressed3, setIsConfirmationPressed3] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    const hebrewCharacters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ך', 'ל', 'מ', 'ם', 'נ', 'ן', 'ס', 'ע', 'פ', 'ף', 'צ', 'ץ', 'ק', 'ר', 'ש', 'ת'];

    const handleKeyPressName = (key) => {
        if (key === 'x') {
            // Delete the last character
            setPatientName((prevName) => prevName.slice(0, -1));
        } else {
            // Append the character
            setPatientName((prevName) => prevName + key);
        }
    };

    const handleNameSubmit = () => {

        if (patientName.trim() === '') {
            alert('Please enter Name');
            return;
        }

        setIsConfirmationPressed1(false);
        setIsConfirmationPressed2(true);


    };

    const handleClinicSelection = (selectedClinic) => {
        setPatientClinic(selectedClinic);
    };

    const handleClinicSubmit = () => {

        if (patientName.trim() === '') {
            alert('Please enter Name');
            return;
        }

        const apiUrl =  `${url}/main-table`;
        const requestData = {
            name: patientName,
            clinic: patientClinic,
        };

        axios.post(apiUrl, requestData)
            .then(response => {
                setNewPatient(response.data.data);
                console.log(newPatient)
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
        setIsConfirmationPressed2(false);
        setIsConfirmationPressed3(true);

        function padTo2Digits(num) {
            return String(num).padStart(2, '0');
        }

        const now = new Date();
        const currentTime = padTo2Digits(now.getHours()) + ':' + padTo2Digits(now.getMinutes());

        setCurrentTime(currentTime);

        // Reset the state after 10 seconds
        setTimeout(() => {
            setPatientName('');
            setPatientClinic('');
            setNewPatient([])
            setIsConfirmationPressed3(false);
            setIsConfirmationPressed1(true);

        }, 11000);

    };
    return (

        <>
            <div className='patientEnterCont'>
                <div className='enterBoardCont'>
                    <div className='enterBoard'>
                        {isConfirmationPressed1 && (
                            <div className='insertName'>
                                <input
                                    placeholder="הכנס שם מלא"
                                    type="text"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    className='inputNameBtn'
                                />
                                <div className='virtualKeyboard'>
                                    {[...hebrewCharacters].map((key) => (
                                        <button
                                            key={key}
                                            className='keyboard'
                                            onClick={() => handleKeyPressName(key.toString())}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                    <button
                                        className='spaceBtn'
                                        onClick={() => handleKeyPressName(' ')}
                                        key={' '}
                                    >
                                        רווח
                                    </button>
                                    <button
                                        className=' keyboard deletePrevBtn'
                                        onClick={() => handleKeyPressName('x')}
                                        key={'x'}
                                    >
                                        מחק
                                    </button>
                                </div>
                                <button className='continueBtn' onClick={handleNameSubmit}>
                                    המשך
                                </button>

                            </div>

                        )}


                        {isConfirmationPressed2 && (
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


                        {isConfirmationPressed3 && (
                            <div className='numberNote'>
                                <div className='patientInfo'>
                                    <div className='numberCont'>
                                        <div>מספרך בתור:</div>
                                        <div className='uniqueNumber'>
                                            {newPatient.uniqueNumber}
                                        </div>
                                    </div>
                                    <div className='moreDetails'>שם: {newPatient.name}</div>
                                    <div className='moreDetails'>קופת חולים: {newPatient.clinic}</div>
                                    <div className='moreDetails'>שעה: {currentTime}</div>
                                </div>
                                <div className='saveNumber'>
                                    יש לשמור את המספר לאורך הטיפול
                                </div>
                            </div>
                        )}



                    </div>
                </div>

            </div >
        </>

    );
};

export default PatientEnter;
