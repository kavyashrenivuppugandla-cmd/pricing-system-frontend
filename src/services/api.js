import axios from "axios";

// Using a relative path to leverage Vercel (production) and package.json (dev) proxies.
// This resolves CORS issues by making API calls appear as same-origin requests.
export const BASE_URL = "/api";

const API = axios.create({
    baseURL: BASE_URL
});

export default API;