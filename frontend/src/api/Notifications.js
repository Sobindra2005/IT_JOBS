
import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const NotifyJobapply = (receiverId, userId ,jobrole ) => api.post(`${API_BASE_URL}/notify/jobapply`,{receiverId, userId ,jobrole },{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export const getnotifications = (receiverId, userId ,jobrole ) => api.get(`${API_BASE_URL}/notification`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})