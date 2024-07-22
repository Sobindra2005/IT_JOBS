
import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")
console.log(token)

export const GetUserById = (id) => api.get(`${API_BASE_URL}/getUser/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
