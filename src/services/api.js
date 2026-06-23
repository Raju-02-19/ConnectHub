import axios from "axios";

const api = axios.create({
    baseURL: "https://connecthub-backend-4t3q.onrender.com/api",
});

export default api;