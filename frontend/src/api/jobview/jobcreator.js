import axios from 'axios'
import API_BASE_URL from '../../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")


export const Job = () => api.get(`${API_BASE_URL}/postedjob`,
 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
)

