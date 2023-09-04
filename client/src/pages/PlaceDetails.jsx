import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import renhouseService from '../services/renhouse.service'

const PlaceDetails = () => {
    const [placeData, setPlaceData] = useState(null)
    const [showAllImages, setShowAllImages] = useState(false)
    const { place_id } = useParams()
    const { user } = useContext(AuthContext)

    const isOwner = placeData && placeData.owner && placeData.owner === user._id

    useEffect(() => {
        renhouseService
            .getOnePlace(place_id)
            .then(({ data }) => {
                setPlaceData(data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [place_id])

    if (!placeData) {
        return <p>Loading...</p>
    }

    if (showAllImages) {
        return (
            <div className='absolute bg-white min-w-full min-h-screen'>
                {placeData?.imageUrl.length > 0 && placeData.imageUrl.map(image => (
                    <div key={place_id}>
                        <img src={image} />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
                <h1 className='text-3xl'>{placeData.title}</h1>
                <a className='my-2 block font-semibold underline' target='_blank' href={`https://maps.google.com/?q=${placeData.address}`} rel="noreferrer" >
                    {placeData.address}
                </a>
                <div className='relative'>

                    <div className='grid gap-2 grid-cols-[2fr_1fr]'>
                        <div>
                            {placeData.imageUrl && (
                                <img className='aspect-square object-cover' src={placeData.imageUrl[0]} alt="" srcSet="" />
                            )}
                        </div>
                        <div className='grid'>
                            {placeData.imageUrl && (
                                <div>

                                    <img className='aspect-square object-cover' src={placeData.imageUrl[1]} alt="" srcSet="" />
                                </div>
                            )}
                            <div className='overflow-hidden'>
                                {placeData.imageUrl && (
                                    <img className='aspect-square object-cover relative top-2' src={placeData.imageUrl[2]} alt="" srcSet="" />
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowAllImages(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                        </svg>
                        Show more photos
                    </button>
                </div>

                {/* {placeData.imageUrl.length > 0 && (
                    <div className='flex flex-wrap'>
                        {placeData.imageUrl.map((url, id) => (
                            <img key={id} src={url} alt={`Image ${id}`} className='w-32 h-32 bg-gray-300 mr-2 mb-2 object-cover' />
                        ))}
                    </div>
                )} */}
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
            </div>
            <div className="text-center flex justify-around">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Go Back
                </Link>
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