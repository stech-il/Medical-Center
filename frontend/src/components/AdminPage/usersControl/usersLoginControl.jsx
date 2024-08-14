import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getUserByEmailAddress, userLogin } from '../../../clientServices/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import { getRoleById } from '../../../clientServices/RoleService';

function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate();

    emailjs.init('OGeC5v16OEXHrsSlr');

    const [user, setUser] = useState({
        Password: '',
        Email: '',
    });

    const handleUserLogin = async () => {
        try {
            var userData = await userLogin(user);
            if (userData) {
                sessionStorage.setItem('email', userData.Email);
                if (userData.RoleID === 1)
                    navigate('/admin', { state: 1 });
                else {
                    if (userData.RoleID === 2)
                        navigate('/rooms');
                    else
                        navigate('/admin', { state: 0 });
                }
            }
            else
                alert("error");
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
    }


    const handleForgotPassword = async (e) => {

        if (!user.Email) {
            alert("Email address required");
        }
        else {
            var isExist = await getUserByEmailAddress(user.Email);
            if (!isExist) {
                alert("Email not exist");
            }
            else {
                e.preventDefault();

                var generatedPassword;

                var role = await getRoleById(user.RoleID);
                sessionStorage.setItem('email', user.Email);
                sessionStorage.setItem('role', role.Role);

                generatedPassword = generateRandomPassword();
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
                        props.onHide();
                        navigate('/checkPassword', { state: generatedPassword });
                    })
                    .catch((error) => {
                        console.error('FAILED...', error);
                    });
            }
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>כניסת משתמש</h4>
                <form>
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.Password}
                        onChange={(e) => setUser({ ...user, Password: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.Email}
                        onChange={(e) => setUser({ ...user, Email: e.target.value })}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => navigate('/')}>סגירה</Button>
                <Button onClick={handleForgotPassword}>שכחתי סיסמא</Button>
                <Button onClick={handleUserLogin}>כניסה</Button>
            </Modal.Footer>
        </Modal>
    );
}


const UserLogin = () => {
    const [modalShow, setModalShow] = useState(true);

    return (
        <div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default UserLogin;
