import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/upload',
});

export const uploadImages = (imageForm) => {
    return axiosInstance.post('/images', imageForm);
};

const uploadService = {
    uploadImages
}


export default uploadService;

