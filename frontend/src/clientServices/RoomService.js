import axios from 'axios';

const API_URL = 'http://localhost:8000/rooms';

export const getAllRooms = async () => {
    return axios.get(API_URL);
};

export const getRoomById = async (id) => {
    return (await axios.get(`${API_URL}/${id}`));
};

export const createRoom = async (name, description) => {
    return axios.post(API_URL, { name, description });
};

export const updateRoom = async (id, name, description) => {
    return axios.put(`${API_URL}/${id}`, { name, description });
};

export const deleteRoom = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
