import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import renhouseService from '../services/renhouse.service'

const IndexPage = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        renhouseService
            .getPlaces()
            .then(({ data }) => setPlaces(data))
            .catch(error => console.log(error))
    }, [])

    if (!places) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {places.length > 0 && places.map(place => (
                <Link key={place._id} to={`/places/${place._id}`}>
                    <div key={place._id} className="bg-gray-500 mb-2 rounded-2xl flex" >
                        {place.imageUrl?.[0] && (
                            <img className='rounded-2xl object-cover aspect-square' src={place.imageUrl[0]} alt="" />
                        )}
                    </div>
                    <h3 className='font-bold'>{place.address}</h3>
                    <h2 className='text-sm text-gray-500'>{place.title}</h2>
                    <div className="mt-1">
                        <span className="font-bold">price</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default IndexPage