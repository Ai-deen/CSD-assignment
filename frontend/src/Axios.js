import axios from 'axios'

const instance = axios.create({
    baseURL: "https://kass.onrender.com" 
})

export default instance
