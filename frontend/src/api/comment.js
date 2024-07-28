import axios from 'axios'
import API_BASE_URL from '../../portConfig'

const api = axios.create({ baseURL: `${API_BASE_URL}` });
const token = localStorage.getItem("token")

export const postComment = (postId, comment, userId) => api.post(`${API_BASE_URL}/comment/${postId}`, { comment, userId }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})



export const cmtlike = (cmtId) => api.put(`${API_BASE_URL}/cmt/addlike/${cmtId}`,{},
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })


export const cmtrmlike = (cmtId) => api.delete(`${API_BASE_URL}/cmt/rmlike/${cmtId}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

export const cmtdislike = (cmtId) => api.put(`${API_BASE_URL}/cmt/addDislike/${cmtId}`, {  }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const cmtrmdislike = (cmtId) => api.delete(`${API_BASE_URL}/cmt/rmdislike/${cmtId}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    }
})