import axios from 'axios';

const API_URL = 'http://localhost:8000/messages';

export const getAllMessages = async () => {
    return axios.get(API_URL);
};

export const getMessageById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createMessage = async (message, status) => {
    return axios.post(API_URL, { message, status });
};

export const updateMessage = async (id, message) => {
    return axios.put(`${API_URL}/${id}`, { message });
};

export const deleteMessage = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
