import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://hackathon-portal.herokuapp.com/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}