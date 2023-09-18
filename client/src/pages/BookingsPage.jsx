import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookingDates from '../components/BookingDates'
import PlaceImg from '../components/PlaceImg'
import ProfileNav from '../components/ProfileNav'
import bookingService from '../services/booking.service'

const BookingsPage = () => {
    const [bookings, setBookings] = useState([])


    useEffect(() => {
        bookingService.getBookings()
            .then(({ data }) => {
                setBookings(data)
            })
            .catch(error => {
                console.log('Error fetching bookings', error)
            })
    }, [])


    return (
        <div>
            <ProfileNav />
            <div className='xl:w-10/12 mx-auto'>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex flex-col md:flex-row gap-4 bg-gray-200 rounded-xl overflow-hidden mb-4'>
                        <div className='w-full md:w-48'>
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className='py-3 px-3 grow'>
                            <h2 className='text-xl'>{booking.place.title}</h2>
                            <div className='text-lg'>
                                <BookingDates booking={booking} className='booking-dates-sm mb-3 mt-4 text-gray-500' />
                                <div className={`flex gap-1 text-xl ${window.innerWidth < 768 ? 'justify-center' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <p>Total price: ${booking.price}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage