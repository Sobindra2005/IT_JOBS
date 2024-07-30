import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")


export const Jobapplyapi = (applicantId, recruiterId,postId,firstName, lastName, email, phonenumber, country, city, postalcode, address, descriptionforjob) => api.post(`${API_BASE_URL}/jobapply`,
 { applicantId, recruiterId,postId,firstName, lastName, email, phonenumber, country, city, postalcode, address, descriptionforjob },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
)

