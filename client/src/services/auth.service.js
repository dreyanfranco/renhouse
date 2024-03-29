import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/auth`,
});

export const register = (userData) => {
    return axiosInstance.post('/register', userData);
}

export const login = (userData) => {
    return axiosInstance.post('/login', userData)
}

export const verify = (token) => axiosInstance.get('/verify', { headers: { Authorization: `Bearer ${token}` } })

const authService = {
    axiosInstance,
    register,
    login,
    verify,
};

export default authService;