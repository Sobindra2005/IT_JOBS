
import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const Notification = (receiverId, userId, jobrole, message) => api.post(`${API_BASE_URL}/notify`, { receiverId, userId, jobrole, message }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export const getnotifications = (receiverId, userId, jobrole) => api.get(`${API_BASE_URL}/notification`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const seenHandle = (notificationId) => api.post(`${API_BASE_URL}/seen`, { notificationId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})