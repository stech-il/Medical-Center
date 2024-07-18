import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyVerticallyCenteredModal(props) {

    const location = useLocation();
    const generatedPassword = location.state;

    const navigate = useNavigate();

    const [temporaryPassword, setTemporaryPassword] = useState();

    const checkTemporaryPassword = () => {

        if (temporaryPassword === generatedPassword) {
            navigate('/newPassword');
        }
        else {
            alert("The password is incorrect");
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    סיסמא זמנית
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>סיסמא זמנית</h4>
                <form>
                    <input
                        type="password"
                        placeholder="Temporary Password"
                        value={temporaryPassword}
                        onChange={(e) => setTemporaryPassword(e.target.value)}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={checkTemporaryPassword}>אישור</Button>
            </Modal.Footer>
        </Modal>
    );
}



const ConfirmPassword = () => {

    return (
        <div>
            <MyVerticallyCenteredModal
                show={true}
            />
        </div>
    );
};

export default ConfirmPassword;