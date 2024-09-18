import axios from 'axios';


const server_url = process.env.USE_URL == true ? process.env.NODE_SERVER_URL : 'http://localhost:8000'
const API_URL = `${server_url}/patients`;

export const getAllPatientsWithQueueDetails = async () => {
    return axios.get(`${API_URL}/patientQueueDetails`);
};

export const getPatientById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createPatient = async (data) => {
    return axios.post(`${API_URL}/`, data);
};

export const updatePatient = async (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

export const deletePatient = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};


export const addManualPatient = async (data) => {
    return axios.post(`${API_URL}/addManualPatient`, data);
};