import axios from "axios"

const API = () => {
  const defaultOptions = {
    baseURL: "http://localhost:4000",
    responseType: "json",
    headers: {
      'Content-Type': 'application/json',
    },
  }

  let instance = axios.create(defaultOptions)

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken')
    config.headers.Authorization =  token ? `Bearer ${token}` : ''
    return config
  })

  return instance
}

export default API()
