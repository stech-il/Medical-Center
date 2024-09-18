import axios from 'axios';


const server_url = process.env.USE_URL == true ? process.env.NODE_SERVER_URL : 'http://localhost:8000'
const API_URL = `${server_url}/roles`;
export const getRoles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRoleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRole = async (role) => {
  const response = await axios.post(API_URL, role);
  return response.data;
};

export const updateRole = async (id, role) => {
  const response = await axios.put(`${API_URL}/${id}`, role);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
