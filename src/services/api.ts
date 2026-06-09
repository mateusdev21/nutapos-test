import axios from 'axios';
import { apiConfig } from "../config/api.config";

export const api = axios.create({
    baseURL: apiConfig.baseURL.value,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    config.baseURL = apiConfig.baseURL.value;
    return config;
});