import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/renhouse'
})

export const newPlace = (placeData, authToken) => {
    return axiosInstance.post('/places', placeData, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}

export const getPublicPlaces = () => {
    return axiosInstance.get('/public-places')
}

export const getUserPlaces = (authToken) => {
    return axiosInstance.get('/places', {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}

export const getOnePlaceFromUser = (place_id) => {
    return axiosInstance.get(`places/${place_id}`)
}

const renhouseService = {
    newPlace,
    getUserPlaces,
    getOnePlaceFromUser
}

export default renhouseService