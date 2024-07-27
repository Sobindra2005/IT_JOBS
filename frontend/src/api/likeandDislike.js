import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const Addlike = (postId) => api.put(`${API_BASE_URL}/addlike/${postId}`,{},
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })


export const Removelike = (postId) => api.delete(`${API_BASE_URL}/removelike/${postId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const AddDislike = (postId) => api.put(`${API_BASE_URL}/adddislike/${postId}`, {  }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const removeDislike = (postId) => api.delete(`${API_BASE_URL}/removedislike/${postId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})