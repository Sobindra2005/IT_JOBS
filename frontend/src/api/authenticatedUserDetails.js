import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000'});
const token= localStorage.getItem("token")

    const AuthenticatedUser=()=> api.get('http://localhost:3000/authenticated',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

export default AuthenticatedUser