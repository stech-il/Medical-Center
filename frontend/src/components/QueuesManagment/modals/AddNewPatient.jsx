// AddPatientModal.js
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {createPatient} from '../../../clientServices/PatientsService'

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

export default function AddPatientModal({ open, handleClose, handleAddPatient }) {
  const [patientName, setPatientName] = React.useState('');
  const [patientHMO, setPatientHMO] = React.useState('');

  const handleSubmit = () => {
    handleAddPatient({ name: patientName, hmo: patientHMO });
    handleClose();
  };

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
          sx={{ fontFamily: 'Segoe UI, sans-serif', fontWeight: 'bold' }}
        >
          הוספת מטופל חדש
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="שם מטופל"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="קופת חולים"
            value={patientHMO}
            onChange={(e) => setPatientHMO(e.target.value)}
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: 3 }}>
            הוסף מטופל
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            ביטול
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
