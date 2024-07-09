import axios from 'axios';

const API_URL = 'http://localhost:8000/patients';

export const getAllPatientsWithQueueDetails = async () => {
    return axios.get(`${API_URL}/patientQueueDetails`);
};

export const getPatientById = async (id) => {
    return axios.get(`${API_URL}/patients/${id}`);
};

export const createPatient = async (data) => {
    return axios.post(`${API_URL}/patients`, data);
};

export const updatePatient = async (id, data) => {
    return axios.put(`${API_URL}/patients/${id}`, data);
};

export const deletePatient = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
