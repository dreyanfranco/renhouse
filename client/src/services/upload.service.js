import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/upload',
});

export const uploadImage = (imageForm) => {
    return axiosInstance.post('/image', imageForm);
};

const uploadService = {
    uploadImage
}


export default uploadService;

