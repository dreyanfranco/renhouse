import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Address from '../components/Address'
import BookingDates from '../components/BookingDates'
import PlaceGallery from '../components/PlaceGallery'
import bookingService from '../services/booking.service'

const BookingDetails = () => {
    const { booking_id } = useParams()
    const [bookingData, setBookingData] = useState(null)

    useEffect(() => {
        bookingService
            .getOneBooking(booking_id)
            .then(({ data }) => {
                setBookingData(data)
            })
            .catch(error => console.log(error))

    }, [booking_id])

    if (!bookingData) {
        return <p>Loading...</p>
    }
    return (
        <div className='my-8'>
            <h1 className='text-3xl'>{bookingData.place.title}</h1>
            <Address className="my-2 block">{bookingData.place.address}</Address>
            <div className='bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl mb-4'>Booking information</h2>
                    <BookingDates booking={bookingData} />
                </div>
                <div className='bg-primary p-6 text-white rounded-2xl'>
                    <div>Price</div>
                    <div className='text-3xl'>{bookingData.price}</div>
                </div>
            </div>
            <PlaceGallery placeData={bookingData.place} />
        </div>
    )
}

export default BookingDetails