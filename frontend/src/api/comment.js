import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const postComment = (postid, comment, userId) => api.post(`${API_BASE_URL}/comment/${postid}`, { comment, userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
