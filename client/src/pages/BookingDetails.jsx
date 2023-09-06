import React from 'react'
import { useParams } from 'react-router-dom'

const BookingDetails = () => {
    const { booking_id } = useParams()
    return (
        <div>BookingDetails: {booking_id}</div>
    )
}

export default BookingDetails