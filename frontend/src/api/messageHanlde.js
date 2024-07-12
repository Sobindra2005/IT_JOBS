import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}`});
const token = localStorage.getItem("token")

export const messageList=()=> api.get(`${API_BASE_URL}/msg`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const getorcreateMsg=(senderId,receiverId)=> api.post(`${API_BASE_URL}/msg`,
    {
      senderId,receiverId  
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

)

export const postMessage =(senderId,receiverId,chatId,message)=> api.post(`${API_BASE_URL}/msg/${chatId}`,
    {
        senderId,receiverId,chatId,message
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

)