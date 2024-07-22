import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const Addlike = (id, userId) => api.patch(`${API_BASE_URL}/addlike/${id}`, { userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export const Removelike = (id, userId) => api.delete(`${API_BASE_URL}/removelike/${id}`, { userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const AddDislike = (id, userId) => api.patch(`${API_BASE_URL}/adddislike/${id}`, { userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const removeDislike = (id, userId) => api.patch(`${API_BASE_URL}/removedislike/${id}`, { userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})