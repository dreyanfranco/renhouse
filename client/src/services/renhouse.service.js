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

const renhouseService = {
    newPlace,
}

export default renhouseService