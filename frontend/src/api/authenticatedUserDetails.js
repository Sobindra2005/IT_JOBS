import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}`});
const token= localStorage.getItem("token")

    const AuthenticatedUser=()=> api.get(`${API_BASE_URL}/authenticated`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export default AuthenticatedUser