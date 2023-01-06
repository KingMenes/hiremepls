import axios from "axios";

export default axios.create({
  baseURL: "https://hiremepls-api.onrender.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
