import axios from "axios";

let api = axios.create({
     baseURL: import.meta.env.VITE_BASE_API_URL,
     headers:{
          Accept:"application/json",
          "Content-Type":"application/json"

     }
})

export default api;