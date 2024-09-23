import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Button, Modal, Typography, MenuItem } from '@mui/material';
import { createUser, getUserByEmailAddress, deleteUser, updateUser } from '../../../clientServices/UserService';
import { getRoles } from '../../../clientServices/RoleService';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../sidebar/sidebar';
import Role from '../../Role/role';
import UsersTable from './usersTable/usersTable';
import './usersControl.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

function AddUserModal({ open, handleClose, user, createOrUpdate }) {
    const [newUser, setNewUser] = React.useState({
        Name: '',
        RoleID: '',
        Password: '',
        Email: '',
        Phone: '',
        Status: true
    });
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({
        Name: '',
        RoleID: '',
        Password: '',
        Email: '',
        Phone: ''
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getRoles();
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    useEffect(() => {
        if (createOrUpdate === false && user) {
            setNewUser(user);
        }
        else {
            setNewUser({
                Name: '',
                RoleID: '',
                Password: '',
                Email: '',
                Phone: '',
                Status: true
            });
        }
    }, [createOrUpdate, user]);

    const validateUserName = () => {
        if (!newUser.Name) {
            setErrors(prevErrors => ({ ...prevErrors, Name: 'שם משתמש נדרש' }));
            console.log(errors);
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, Name: '' }));
        return true;
    };

    const validatePhoneNumber = () => {
        if (!newUser.Phone) {
            setErrors(prevErrors => ({ ...prevErrors, Phone: 'מספר טלפון נדרש' }));
            return false;
        }
        const regex = /^\d{10}$/;
        if (!regex.test(newUser.Phone)) {
            setErrors(prevErrors => ({ ...prevErrors, Phone: 'מספר טלפון לא תקין' }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, Phone: '' }));
        return true;
    };

    const validatePassword = () => {
        if (!newUser.Password) {
            setErrors(prevErrors => ({ ...prevErrors, Password: 'סיסמה נדרשת' }));
            return false;
        }
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!regex.test(newUser.Password)) {
            setErrors(prevErrors => ({ ...prevErrors, Password: 'סיסמה חייבת להכיל לפחות 6 תווים, כולל אות ומספר' }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, Password: '' }));
        return true;
    };

    const validateEmail = () => {
        if (!newUser.Email) {
            setErrors(prevErrors => ({ ...prevErrors, Email: 'כתובת אימייל נדרשת' }));
            return false;
        }
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(newUser.Email)) {
            setErrors(prevErrors => ({ ...prevErrors, Email: 'כתובת אימייל לא תקינה' }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, Email: '' }));
        return true;
    };

    const validateRole = () => {
        if (newUser.RoleID === '' || newUser.RoleID === 0) {
            setErrors(prevErrors => ({ ...prevErrors, RoleID: 'תפקיד נדרש' }));
            return false;
        }
        setErrors(prevErrors => ({ ...prevErrors, RoleID: '' }));
        return true;
    };

    const validateInputs = () => {
        if (createOrUpdate === false)
            return validateUserName() && validateRole() && validateEmail() && validatePhoneNumber();
        return validateUserName() && validateRole() && validatePassword() && validateEmail() && validatePhoneNumber();
    };

    const handleCreateUser = async () => {
        try {
            if (!validateInputs()) {
                //alert("נתונים לא תקינים");
                return;
            }
            const isExist = await getUserByEmailAddress(newUser.Email);
            console.log(isExist)
            if (isExist.data != null) {
                alert('כתובת מייל כבר קיימת');
                return;
            }
            else {
                await createUser(newUser);
                handleClose();
                window.location.reload();
            }

        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async () => {
        try {
            if (!validateInputs()) {
                //alert("נתונים לא תקינים");
                return;
            }
            await updateUser(newUser.ID, newUser);
            if (user.Name === sessionStorage.getItem('name'))
                sessionStorage.setItem('name', newUser.Name);
            handleClose();
        }
        catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {createOrUpdate === false ? (<Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 'bold' }}
                >
                    עדכון פרטי משתמש
                </Typography>) :
                    (<Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 'bold' }}
                    >
                        הוספת משתמש
                    </Typography>)}
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="שם"
                        value={newUser.Name}
                        onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
                        error={errors.Name !== ''}
                        helperText={errors.Name}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="תפקיד"
                        value={newUser.RoleID}
                        onChange={(e) => setNewUser({ ...newUser, RoleID: e.target.value })}
                        error={!!errors.RoleID}
                        helperText={errors.RoleID}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value={0}>בחר תפקיד</MenuItem>
                        {roles.map((role) => (
                            <MenuItem key={role.ID} value={role.ID}>
                                {role.Role}
                            </MenuItem>
                        ))}
                    </TextField>
                    {createOrUpdate && (<TextField
                        type="password"
                        label="סיסמה"
                        value={newUser.Password}
                        onChange={(e) => setNewUser({ ...newUser, Password: e.target.value })}
                        error={!!errors.Password}
                        helperText={errors.Password}
                        fullWidth
                        margin="normal"
                    />)}
                    <TextField
                        type="email"
                        label="אימייל"
                        value={newUser.Email}
                        onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
                        error={!!errors.Email}
                        helperText={errors.Email}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="טלפון"
                        value={newUser.Phone}
                        onChange={(e) => setNewUser({ ...newUser, Phone: e.target.value })}
                        error={!!errors.Phone}
                        helperText={errors.Phone}
                        fullWidth
                        margin="normal"
                    />
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    {createOrUpdate === false ? (<Button variant="contained" color="primary" onClick={() => handleUpdateUser()} sx={{ marginRight: 3 }}>
                        עדכן משתמש
                    </Button>) : (<Button variant="contained" color="primary" onClick={() => handleCreateUser()} sx={{ marginRight: 3 }}>
                        הוסף משתמש
                    </Button>)}
                    <Button variant="contained" color="secondary" onClick={() => handleClose()}>
                        ביטול
                    </Button>
                </Box>
            </Box>
        </Modal >
    );
}

function DeleteUserModal({ open, handleClose, handleConfirm, userName }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 'bold' }} // Change font family and weight
                >
                    מחיקת משתמש
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, fontFamily: 'Segoe UI, sans-serif', fontWeight: 'normal' }} // Change font family and weight
                    icon='warning'
                >
                    ?{userName} האם אתה בטוח שברצונך למחוק את המשתמש
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <button className='cancalOrSubmitBtn' onClick={() => handleConfirm()} sx={{ marginRight: 3 }}>
                        אישור
                    </button>
                    <button className='cancalOrSubmitBtn' onClick={() => handleClose()}>
                        ביטול
                    </button>
                </Box>
            </Box>
        </Modal>
    );
}

const UsersControl = () => {
    const [selectedUserInTable, setSelectedUserInTable] = useState(null);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isUserDeleteModalOpen, setIsUserDeleteModalOpen] = useState(false);
    const [createOrUpdate, setCreateOrUpdate] = useState(true); // true = create, false = update

    const location = useLocation();
    const role = location.state;
    const childRef = useRef();

    const divStyle = {
        width: '65%'
    };

    const handleSelectUserInTable = (user) => {
        setSelectedUserInTable(user);
    };

    const handleOpenAddUserModal = () => {
        setCreateOrUpdate(true);
        setIsAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddUserModalOpen(false);
        setIsUpdateUserModalOpen(false);
    };

    const handleOpenUpdateUserModal = () => {
        if (selectedUserInTable === null) {
            alert('בחר משתמש לעדכון');
        }
        else {
            setCreateOrUpdate(false);
            setIsUpdateUserModalOpen(true);
        }
    };

    const handleCloseUserDeleteModal = () => {
        setIsUserDeleteModalOpen(false);
    };

    const handleConfirmUserDeleteModal = async () => {
        try {
            console.log(selectedUserInTable.ID)
            await deleteUser(selectedUserInTable.ID);

            alert('המשתמש נמחק בהצלחה');
            window.location.reload();
            setSelectedUserInTable(null);
            handleCloseUserDeleteModal();
        } catch (error) {
            console.error('Error deleting user:', error);
            // alert('כרגע החדר בשימוש, אין אפשרות למחוק אותו');
        }
    };


    return (
        <>
            <div className='queueManagmentContainer'>

                <Sidebar role={role} />
                <div className='roomsDetailsTableContainer' style={divStyle}>
                    <div className='managmentTitle'>משתמשים</div>

                    <UsersTable ref={childRef} onSelectUserInTable={handleSelectUserInTable} />
                    <div className='moreOperationCont'>
                        <div className='actionOfPatientContainer'>
                            <button className='moreOperation' onClick={() => handleOpenAddUserModal()}>הוספת משתמש</button>
                            <button className='moreOperation' onClick={() => childRef.current.handleToggleStatus()}>שנה סטטוס משתמש</button>
                            <button className='moreOperation' onClick={() => handleOpenUpdateUserModal()}>עדכון פרטי משתמש</button>
                            <button className='moreOperation' onClick={() => setIsUserDeleteModalOpen(true)}>מחיקת משתמש</button>
                        </div>
                    </div>
                </div>
                <Role />
            </div>

            <AddUserModal
                open={isAddUserModalOpen || isUpdateUserModalOpen}
                handleClose={() => handleCloseAddUserModal()}
                user={selectedUserInTable}
                createOrUpdate={createOrUpdate}
            />

            <DeleteUserModal
                open={isUserDeleteModalOpen}
                handleClose={() => handleCloseUserDeleteModal()}
                handleConfirm={() => handleConfirmUserDeleteModal()}
                userName={selectedUserInTable ? `${selectedUserInTable.Name}` : ''}
            />
        </>
    );
};

export default UsersControl;
