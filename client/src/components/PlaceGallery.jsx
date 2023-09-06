import { useState } from 'react'
import Modal from 'react-modal'

const PlaceGallery = ({ placeData }) => {
    const [showAllImages, setShowAllImages] = useState(false)
    const openModal = () => setShowAllImages(true)
    const closeModal = () => setShowAllImages(false)
    return (
        <>
            <div className='relative'>
                <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
                    <div>
                        {placeData.imageUrl && (
                            <img onClick={openModal} className='cursor-pointer aspect-square object-cover' src={placeData.imageUrl[0]} />
                        )}
                    </div>
                    <div className='grid'>
                        {placeData.imageUrl && (
                            <div>
                                <img onClick={openModal} className='cursor-pointer aspect-square object-cover' src={placeData.imageUrl[1]} />
                            </div>
                        )}
                        <div className='overflow-hidden'>
                            {placeData.imageUrl && (
                                <img onClick={openModal} className='cursor-pointer aspect-square object-cover relative top-2' src={placeData.imageUrl[2]} />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={openModal} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                    Show more photos
                </button>
            </div>
            <Modal isOpen={showAllImages} onRequestClose={closeModal} ariaHideApp={false}>
                <div className='absolute inset-0'>
                    <div className='flex flex-col items-center gap-4 mt-4'>
                        <div className='flex justify-start' >
                            <h2 className='text-3xl'>{placeData.title}</h2>
                            <button
                                onClick={closeModal}
                                className="flex fixed right-12 px-4 py-2 bg-gray text-black rounded hover:bg-white hover:text-gray-500 hover:border border-gray-500 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Close Modal
                            </button>
                        </div>
                        {placeData?.imageUrl.length > 0 && placeData.imageUrl.map((image, index) => (
                            <div key={index}>
                                <img src={image} />
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default PlaceGallery