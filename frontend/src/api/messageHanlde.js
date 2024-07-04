import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:4000'});
const token = localStorage.getItem("token")

 const messageList=()=> api.get('http://localhost:4000/msg',{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export default messageList