import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://shoppal-server-rdport.onrender.com',
  withCredentials: true,
  headers: { access_token: localStorage.getItem('access_token') }
})

export default instance
