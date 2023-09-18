import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import bookingService from "../services/booking.service";

const BookingWidget = ({ placeData }) => {

    const [booking, setBooking] = useState({
        checkIn: '',
        checkOut: '',
        numberOfGuests: 1,
        name: '',
        phone: ''
    })



    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const capitalizedFirstName = capitalizeFirstLetter(user.name);
            setBooking(prevBooking => ({
                ...prevBooking,
                name: capitalizedFirstName
            }))
        }
    }, [user])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let numberOfNights = 0;
    if (booking.checkIn && booking.checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))
    }

    const bookingData = {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        numberOfGuests: booking.numberOfGuests,
        name: booking.name,
        phone: booking.phone,
        place: placeData._id,
        price: placeData.price,
        user: user ? user._id : null
    }


    const handleBooking = async () => {
        try {
            await bookingService.newBooking(bookingData)
            navigate('/account/bookings')
        } catch (error) {
            console.log('Error making booking', error)
        }
    }



    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBooking({ ...booking, [name]: value })
    }




    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className="text-2xl text-center">
                Price: ${placeData.price}/night
            </div>
            <div className='border rounded-xl mt-4'>
                <div className="flex">
                    <div className='py-3 px-4'>
                        <label>Check in:</label>
                        <input
                            type="date"
                            name='checkIn'
                            value={booking.checkIn}
                            onChange={handleInputChange}
                            className="text-sm sm:text-base"
                        />
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check out:</label>
                        <input
                            type="date"
                            name='checkOut'
                            value={booking.checkOut}
                            onChange={handleInputChange}
                            className="text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div className='py-3 px-4 border-t'>
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        name='numberOfGuests'
                        value={booking.numberOfGuests}
                        onChange={handleInputChange} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Full name</label>
                        <input
                            type="text"
                            name="name"
                            value={booking.name}
                            onChange={handleInputChange}
                            placeholder="Full name"
                        />
                        <label>Phone number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={booking.phone}
                            onChange={handleInputChange}
                            placeholder="Phone number"
                        />
                    </div>
                )}
            </div>
            <button onClick={handleBooking} className="primary mt-4 w-full">
                Book
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * placeData.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget