import axios from "axios";

const env = process.env.NODE_ENV || 'development'
const API_ENDPOINT = env === 'production' ? 'https://hiremepls-api.onrender.com/api' : 'http://localhost:5000/api'

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
