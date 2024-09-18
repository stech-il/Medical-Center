import axios from 'axios';


const server_url = process.env.USE_URL == true ? process.env.NODE_SERVER_URL : 'http://localhost:8000'
const API_URL = `${server_url}/messages`;

export const getAllMessages = async () => {
    return axios.get(API_URL);
};

export const getMessageById = async (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createMessage = async (Message, Status) => {
    return axios.post(API_URL, { Message, Status });
};

export const updateMessage = async (id, Message) => {
    return axios.put(`${API_URL}/${id}`, {Message});
};

export const updateMessageStatus = async (ID, Status) => {
    return axios.put(`${API_URL}`, { ID,Status});
};


export const deleteMessage = async (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
