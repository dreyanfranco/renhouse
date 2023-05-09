import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/auth',
});

export const register = (userData) => {
    return axiosInstance.post('/register', userData);
}

export const login = (userData) => {
    return axiosInstance.post('/login', userData)
}