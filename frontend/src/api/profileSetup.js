import axios from 'axios';
import API_BASE_URL from '../../portConfig';

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token");

export const ProfileSetup = (data) => api.post('/profileSetup', data, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data'
  },
});
