import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

// baseURL just makes it so that if we have other endpoints, the starting URL is always the same
// only need to work with other endpoints now
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

//automatically adds token 
// ensures authentication for API calls
// handles tokens in one place
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api