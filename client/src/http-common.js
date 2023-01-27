import axios from "axios";

const API_ENDPOINT =
  process.env.NODE_ENV !== "development"
    ? `https://hiremepls-api.onrender.com/api`
    : "/api";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
