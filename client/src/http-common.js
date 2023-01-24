import axios from "axios";

const env = process.env.NODE_ENV || "development";
const API_ENDPOINT = process.env.REACT_APP_SERVER_URL || '/api'
console.log(API_ENDPOINT)
export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
