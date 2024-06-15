import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getUsers, createUser } from '../../../clientServices/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';



function MyVerticallyCenteredModal(props) {
    const [newUser, setNewUser] = useState({
        Name: '',
        RoleID: '',
        Password: '',
        Email: '',
        Phone: ''
    });

    const handleCreateUser = async () => {
        try {
            await createUser(newUser);
            props.onHide();
            props.refreshUsers();
        } catch (error) {
            console.error('Error creating user:', error);
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
                    הוספת משתמש        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>הוספת משתמש חדש</h4>
                <form>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.Name}
                        onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Role ID"
                        value={newUser.RoleID}
                        onChange={(e) => setNewUser({ ...newUser, RoleID: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.Password}
                        onChange={(e) => setNewUser({ ...newUser, Password: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.Email}
                        onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newUser.Phone}
                        onChange={(e) => setNewUser({ ...newUser, Phone: e.target.value })}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>סגירה</Button>
                <Button onClick={handleCreateUser}>אישור</Button>
            </Modal.Footer>
        </Modal>
    );
}

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.ID}>
                        <td>{index + 1}</td>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        <td>{user.Phone}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

const UsersControl = () => {
    const [modalShow, setModalShow] = useState(false);

    const refreshUsers = () => {
        // Function to refresh the users list after creating a new user
        window.location.reload();
    };

    return (
        <div>
            <h1>ניהול משתמשים</h1>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                הוספת משתמש חדש
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                refreshUsers={refreshUsers}
            />

            <div>
                <h2>משתמשים</h2>
                <UsersTable />
            </div>
        </div>
    );
};

export default UsersControl;
