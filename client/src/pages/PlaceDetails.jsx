import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import renhouseService from '../services/renhouse.service'

const PlaceDetails = () => {
    const [placeData, setPlaceData] = useState(null)
    const { place_id } = useParams()

    useEffect(() => {
        renhouseService
            .getOnePlace(place_id)
            .then(({ data }) => setPlaceData(data))
            .catch(error => console.log(error))
    }, [place_id])

    return (
        <>
            <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
                {placeData ? (
                    <>
                        <h1 className='text-3xl'>{placeData.title}</h1>
                        <p>{placeData.address}</p>
                        <img src={placeData.imageUrl} alt="" />
                        <div>
                            <h2 className="font-semibold text-2xl">Descripion</h2>
                            {placeData.description}
                        </div>
                        Check-in: {placeData.checkIn}<br />
                        Check-out: {placeData.checkOut}<br />
                        Max number of guests: {placeData.maxGuests}
                        <div className="bg-white -mx-8 px-8 py-8 border-t">
                            <div>
                                <h2 className="font-semibold text-2xl">Extra info</h2>
                            </div>
                            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{placeData.extraInfo}</div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="text-center">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </Link>
            </div>
        </>
    )
}

export default PlaceDetails