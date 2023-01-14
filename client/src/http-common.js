import axios from "axios";

const env = process.env.NODE_ENV || "development";
const API_ENDPOINT =
  env === "production"
    ? "https://hiremepls-api.onrender.com/"
    : "http://localhost:5000/";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
