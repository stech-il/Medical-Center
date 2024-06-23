import axios from 'axios';

const API_URL = 'http://localhost:8000/queues';

export const getAllQueues = async () => {
    return axios.get(API_URL);
};

export const getQueueById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createQueue = async (data) => {
    return axios.post(API_URL, data);
};

export const updateQueue = async (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
};

export const deleteQueue = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const getQueueListByRoom = async (roomId) => {
    return axios.get(`${API_URL}/roomQueue/${roomId}`);
};
