import React, { useState } from "react";
import axios from 'axios';

// import './PatientEnter.css';

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");

    function validateForm() {
        // return userName.length > 0 &&
        //     userPassword.length > 0 &&
        //     userEmail > 0;
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const createUser = () => {
        const apiUrl = 'http://localhost:8000/users/'; // Update the API URL
        const requestData = {
            Name: userName,
            RoleID: 1, // Replace with actual RoleId
            Password: '123456',
            Email: 'a123',
            Phone: '123',
            Status: true
        };
        console.log(requestData);

        axios.post(apiUrl, requestData)
            .then(response => {
                alert("ok");
                // setNewPatient(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div className="Login">
            <div onSubmit={handleSubmit}>
                <div size="lg" controlId="email">
                    <input
                        placeholder="הכנס שם מלא"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='inputNameBtn'
                    />
                </div>

                <button block size="lg" onClick={createUser}>
                    Sign Up
                </button>
            </div>
        </div>

    );

}

export default SignUp;