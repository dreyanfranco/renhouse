import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Address from '../components/Address'
import BookingWidget from '../components/BookingWidget'
import PlaceGallery from '../components/PlaceGallery'
import { AuthContext } from '../context/auth.context'
import renhouseService from '../services/renhouse.service'

const PlaceDetails = () => {
    const [placeData, setPlaceData] = useState(null)
    const { place_id } = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext)

    const handleGoBack = () => {
        if (location.pathname === '/account/places') {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    useEffect(() => {
        renhouseService
            .getOnePlace(place_id)
            .then(({ data }) => setPlaceData(data))
            .catch(error => console.log(error))

    }, [place_id])

    if (!placeData) {
        return <p>Loading...</p>
    }
    const isOwner = user && placeData.owner === user._id;


    return (
        <>
            <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
                <h1 className='text-3xl'>{placeData.title}</h1>
                <Address>{placeData.address}</Address>
                <PlaceGallery placeData={placeData} />
                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className='my-4'>
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {placeData.description}
                        </div>
                        Check-in: {placeData.checkIn}<br />
                        Check-out: {placeData.checkOut}<br />
                        Max number of guests: {placeData.maxGuests}
                    </div>
                    <div>
                        <BookingWidget placeData={placeData} />
                    </div>
                </div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                        {placeData.extraInfo}
                    </div>
                </div>
            </div>
            <div className="text-center flex justify-around">
                <button onClick={handleGoBack} className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </button>
                {isOwner &&
                    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={`/account/edit-places/${place_id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </Link>
                }
            </div>
        </>
    )
}

export default PlaceDetails