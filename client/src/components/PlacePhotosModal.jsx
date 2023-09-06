import React from 'react'
import Modal from 'react-modal'

const PlacePhotosModal = ({ placeData, closeModal }) => {

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Place Photos"
        >
            <div>
                <button onClick={closeModal}>Close</button>
            </div>
            <div>
                <h2>Photos for {placeData.title}</h2>
                <div className="photo-gallery">
                    {placeData.imageUrl.map((url, index) => (
                        <img key={index} src={url} alt={`Image ${index}`} />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export default PlacePhotosModal