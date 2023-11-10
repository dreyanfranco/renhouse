import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import renhouseService from '../services/renhouse.service'
import { formatCurrency } from '../utilities/formatCurrency'

const IndexPage = () => {
    const [places, setPlaces] = useState([])

    const sortedPlaces = places.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


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
        <section className='overflow-hidden'>
            <Hero />
            <div className='my-8'>
                <h2 className='text-4xl font-bold leading-tight text-center'>Explore latest destination</h2>
            </div>
            <div className='grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-8'>
                {sortedPlaces.length > 0 && sortedPlaces.map(place => (
                    <Link key={place._id} to={`/places/${place._id}`}>
                        <div key={place._id} className="bg-gray-500 mb-2 rounded-2xl flex" >
                            {place.imageUrl?.[0] && (
                                <img className='rounded-2xl object-cover aspect-square' src={place.imageUrl[0]} alt="" />
                            )}
                        </div>
                        <h3 className='font-bold'>{place.address}</h3>
                        <h2 className='text-sm text-gray-500'>{place.title}</h2>
                        <div className="mt-1">
                            <span className="font-bold">{formatCurrency(place.price)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default IndexPage