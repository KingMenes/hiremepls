import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_SERVER_URL || '/api';

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
