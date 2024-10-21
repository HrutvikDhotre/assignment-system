import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'

const user = JSON.parse(localStorage.getItem('user'))

if (user) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
}

export default axiosInstance
