import axios from 'axios';


const server_url = process.env.USE_URL == true ? process.env.NODE_SERVER_URL : 'http://localhost:8000'
const API_URL = `${server_url}/rooms`;

export const getAllRooms = async () => {
    return axios.get(API_URL);
};

export const getRoomById = async (id) => {
    return (await axios.get(`${API_URL}/${id}`));
};

export const createRoom = async (Name, Status) => {
    return axios.post(API_URL, { Name, Status });
};

export const updateRoom = async (id, Name, Status) => {
    return axios.put(`${API_URL}/${id}`, { Name, Status });
};

export const deleteRoom = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
