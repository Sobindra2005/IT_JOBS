import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000'});
const token = localStorage.getItem("token")

 const messageList=()=> api.get('http://localhost:3000/msg',{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export default messageList