import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const Addlike = (postId, userId) => api.patch(`${API_BASE_URL}/addlike/${postId}`, { userId },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })


export const Removelike = (postId, userId) => api.delete(`${API_BASE_URL}/removelike/${postId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            userId
        }
    });

export const AddDislike = (postId, userId) => api.patch(`${API_BASE_URL}/adddislike/${postId}`, { userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const removeDislike = (postId, userId) => api.delete(`${API_BASE_URL}/removedislike/${postId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data:
        { userId }
})