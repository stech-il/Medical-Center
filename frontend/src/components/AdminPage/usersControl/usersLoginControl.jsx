import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userLogin } from '../../../clientServices/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';


function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        Password: '',
        Email: '',
    });

    const handleUserLogin = async () => {
        try {
            var ans = await userLogin(user);
            if (ans)
                navigate('/admin');
            else
                alert("error");
        } catch (error) {
            console.error('Error login user:', error);
            alert("error");
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
                    כניסת משתמש        </Modal.Title>
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
                <Button onClick={handleUserLogin}>כניסה</Button>
            </Modal.Footer>
        </Modal>
    );
}


const UserLogin = () => {
    const [modalShow, setModalShow] = useState(false);

    const refreshUsers = () => {
        // Function to refresh the users list after creating a new user
        window.location.reload();
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                כניסת משתמש
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                refreshUsers={refreshUsers}
            />
        </div>
    );
};

export default UserLogin;
