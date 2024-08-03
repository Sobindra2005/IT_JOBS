import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")



export const Follow = (userId) => api.put(`${API_BASE_URL}/follow/${userId}`,{},
{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })


export const Unfollow = (userId) => api.delete(`${API_BASE_URL}/unfollow/${userId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

