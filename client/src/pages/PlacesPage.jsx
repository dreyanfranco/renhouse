
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav';
import { AuthContext } from '../context/auth.context';
import renhouseService from '../services/renhouse.service';

const PlacesPage = () => {
    const { user } = useContext(AuthContext)
    const [places, setPlaces] = useState([])

    useEffect(() => {
        if (user) {
            renhouseService
                .getPlaces()
                .then(({ data }) => {
                    const userPlaces = data.filter(place => place.owner === user._id)
                    setPlaces(userPlaces)
                })
                .catch(error => console.log('Error fetching user places', error))
        }
    }, [user])


    return (
        <div>
            <ProfileNav />
            <div className="text-center">
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className='mt-4'>
                {places.length > 0 && places.map(place => (
                    <Link to={`/account/places/${place._id}`} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl' key={place._id}>
                        <div className='flex w-32 h-32 bg-gray-300'>
                            {place.imageUrl.length > 0 && (
                                <img className='object-cover' src={place.imageUrl[0]} alt="" />
                            )}
                        </div>
                        <div className=''>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}


export default PlacesPage