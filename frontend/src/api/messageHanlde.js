import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4000'});
const token = localStorage.getItem("token")

export const messageList=()=> api.get('http://localhost:4000/msg',{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const getorcreateMsg=(senderId,receiverId)=> api.post('http://localhost:4000/msg',
    {
      senderId,receiverId  
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

)

export const postMessage =(senderId,receiverId,chatId,message)=> api.post(`http://localhost:4000/msg/${chatId}`,
    {
        senderId,receiverId,chatId,message
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

)