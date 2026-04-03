import axios from "axios";

let api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000',
    headers:{
        Accept: 'Application/json',
        'Content-Type': 'application/json'
    }
})

export default api;