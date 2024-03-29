import axios from "axios";

export const API_ENDPOINT =
  process.env.NODE_ENV !== "development" ? `/api` : "/api";

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-type": "application/json",
  },
});
