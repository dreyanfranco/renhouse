import React from 'react'


const PlaceImg = ({ place, index = 0, className = null }) => {

    if (!place.imageUrl?.length) {
        return ''
    }
    if (!className) {
        className = 'object-cover'
    }
    return (
        <img className={className} src={place.imageUrl[index]} alt="" />
    )


}

export default PlaceImg