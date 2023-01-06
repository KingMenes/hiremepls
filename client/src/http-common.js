import axios from "axios";
const API_ENDPOINT = process.env.environment === 'development' ? `${process.env.REACT_APP_SERVER_URL}/api` : "http://localhost:5000/api";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
