import axios from 'axios';
import { getToken } from './auth';

const Axios = axios.create({
    baseURL: 'http://localhost:8080'
});

Axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default Axios;
