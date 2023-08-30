import React, { useEffect, useState } from 'react'
import renhouseService from '../services/renhouse.service'

const IndexPage = () => {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        renhouseService
            .getPlaces()
            .then(({ data }) => setPlaces(data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            {places.map(place => (
                <h1 key={place._id}>{place.title}</h1>
            ))}
        </div>
    )
}

export default IndexPage