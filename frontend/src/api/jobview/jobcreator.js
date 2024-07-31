import axios from 'axios'
import API_BASE_URL from '../../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); 
      console.log('Setting Authorization header for request:', config.method, config.url); 
      if (token) {
        console.log('Token found, setting Authorization header');
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const Job = () => api.get(`${API_BASE_URL}/postedjob`,
 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
)

export   const getApplicants=(postId)=> api.get(`${API_BASE_URL}/applicants/${postId}`,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export   const AcceptApi=(id)=> api.patch(`${API_BASE_URL}/accept/${id}`,{},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export   const RejectApi=(id)=> api.patch(`${API_BASE_URL}/reject/${id}`,{},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export   const PendingAPi=(id)=> api.patch(`${API_BASE_URL}/pending/${id}`,{},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
})