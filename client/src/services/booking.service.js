import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5005/booking'
})

axiosInstance.interceptors.request.use((config) => {
    const storedStoken = localStorage.getItem('authToken')

    if (storedStoken) {
        config.headers = { Authorization: `Bearer ${storedStoken}` }
    }
    return config
})

export const newBooking = (bookingData) => {
    return axiosInstance.post('/bookings', bookingData)
}

export const getBookings = () => {
    return axiosInstance.get('/bookings')
}

export const getOneBooking = (booking_id) => {
    return axiosInstance.get(`bookings/${booking_id}`)
}


const bookingService = {
    newBooking,
    getBookings,
    getOneBooking
}

export default bookingService