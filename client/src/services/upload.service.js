import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_URL}/upload`,
});

export const uploadImages = (imageForm) => {
    return axiosInstance.post('/images', imageForm);
};

const uploadService = {
    uploadImages
}


export default uploadService;

