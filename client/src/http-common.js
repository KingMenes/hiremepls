import axios from "axios";

const env = process.env.NODE_ENV || "development";
const API_ENDPOINT =
  env === "production"
    ? "http://localhost:5000/"
    : "https://hiremepls-api.onrender.com/";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
