import axios from 'axios'
import API_BASE_URL from '../../portConfig'


const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

const Jobpost = (userId, jobTitle,
    companyName,
    companyDescription,
    jobOverview,
    responsibilities,
    skills,
    qualifications,
    location,
    employmentType,
    salary,
    workingTime,
    startDate,
    applicationDeadline,
    applyProcess,
    contactNumber,
    email,
    additionalInformation) => api.post(`${API_BASE_URL}/createJob/${userId}`,{
        jobTitle,
        companyName,
        companyDescription,
        jobOverview,
        responsibilities,
        skills,
        qualifications,
        location,
        employmentType,
        salary,
        workingTime,
        startDate,
        applicationDeadline,
        applyProcess,
        contactNumber,
        email,
        additionalInformation
},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    
);
 

export default Jobpost