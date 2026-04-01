import axios from "axios";

// Access the environment variable or default to localhost
export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const API = axios.create({
    baseURL: `${BASE_URL}/api`
});

export default API;