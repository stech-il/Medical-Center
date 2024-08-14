import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../../logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getUserByEmailAddress, userLogin } from '../../../clientServices/UserService';
import emailjs from 'emailjs-com';

const Login = () => {
    const navigate = useNavigate();

    emailjs.init('OGeC5v16OEXHrsSlr');

    // Initialize the state for user details
    const [user, setUser] = useState({
        Password: '',
        Email: '',
    });

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleUserLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const userData = await userLogin(user);
            if (userData) {
                sessionStorage.setItem('email', userData.Email);
                if (userData.RoleID === 1) {
                    navigate('/admin', { state: 0 });
                } else if (userData.RoleID === 2) {
                    navigate('/rooms');
                } else {
                    navigate('/admin', { state: 1 });
                }
            } else {
                alert("error");
            }
        } catch (error) {
            console.error('Error login user:', error);
            alert("error");
        }
    };

    const generateRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={}[]|;:<>,.?/';
        let password = '';
        for (let i = 0; i < 10; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!user.Email) {
            alert("Email address required");
        } else {
            const isExist = await getUserByEmailAddress(user.Email);
            if (!isExist) {
                alert("Email not exist");
            } else {
                const generatedPassword = generateRandomPassword();
                const templateParams = {
                    to_email: user.Email,
                    message: generatedPassword,
                };

                emailjs.send(
                    'service_b5emsma', // service ID
                    'template_5f0jjve', // template ID
                    templateParams
                )
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    sessionStorage.setItem('email', user.Email);
                    navigate('/checkPassword', { state: generatedPassword });
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                });
            }
        }
    };

    return (
        <div className="login-container">
            <img className='logo-img' alt='logo' src={logo} />

            <div className='login-title'>כניסת משתמש</div>
            <form className='login-form' onSubmit={handleUserLogin}>
                <input
                    className='login-input'
                    type="email"
                    name="Email"
                    placeholder='אימייל'
                    value={user.Email}
                    onChange={handleChange}
                    required
                />
                <input
                    className='login-input'
                    type="password"
                    name="Password"
                    placeholder='סיסמא'
                    value={user.Password}
                    onChange={handleChange}
                    required
                />
                <button className='login-btn' type="submit">
                    <span className='pagesNavigate-text'>
                        כניסה
                    </span>
                    <ArrowBackIcon />
                </button>
            </form>
            <button className='forgot-password-btn' onClick={handleForgotPassword}>
                שכחתי סיסמא
            </button>
        </div>
    );
};

export default Login;
