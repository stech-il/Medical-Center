import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getUserByEmailAddress, userLogin } from '../../../clientServices/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';

function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate();

    emailjs.init('MWdKGN28PpafQHXOI');

    const [user, setUser] = useState({
        Password: '',
        Email: '',
    });

    const handleUserLogin = async () => {
        try {
            var isExist = await userLogin(user);
            sessionStorage.setItem('email', user.Email);
            if (isExist)
                navigate('/admin');
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

    var generatedPassword;

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

                sessionStorage.setItem('email', user.Email);
                generatedPassword = generateRandomPassword();
                const templateParams = {
                    to_email: user.Email,
                    message: generatedPassword,
                };

                emailjs.send(
                    'service_537hb2a', // service ID
                    'template_87mgofj', // template ID
                    templateParams
                )
                    .then((response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        props.onHide();
                        navigate('/checkPassword', { state: generatedPassword });
                        // confirmPassword();
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    כניסת משתמש
                </Modal.Title>
            </Modal.Header>
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
                <Button onClick={props.onHide}>סגירה</Button>
                <Button onClick={handleForgotPassword}>שכחתי סיסמא</Button>
                <Button onClick={handleUserLogin}>כניסה</Button>
            </Modal.Footer>
        </Modal>
    );
}


const UserLogin = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                כניסת משתמש
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default UserLogin;
