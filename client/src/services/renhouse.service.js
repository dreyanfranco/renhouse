import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/renhouse'
})

axiosInstance.interceptors.request.use((config) => {
    const storedStoken = localStorage.getItem('authToken')

    if (storedStoken) {
        config.headers = { Authorization: `Bearer ${storedStoken}` }
    }
    return config
})

export const newPlace = (placeData) => {
    return axiosInstance.post('/places', placeData)
}

export const getPlaces = () => {
    return axiosInstance.get('/places')
}

export const getOnePlace = (place_id) => {
    return axiosInstance.get(`places/${place_id}`)
}

const renhouseService = {
    newPlace,
    getPlaces,
    getOnePlace
}

export default renhouseService