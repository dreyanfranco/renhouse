import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import uploadService from '../services/upload.service';

const PlacesPage = () => {
    const { action } = useParams();
    const [placeData, setPlaceData] = useState({
        title: '',
        address: '',
        perks: [],
        description: '',
        extraInfo: '',
        imageUrl: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setPlaceData((prevState) => {
            if (type === 'checkbox') {
                const updatedPerks = checked
                    ? [...prevState.perks, name]
                    : prevState.perks.filter((perk) => perk !== name);

                return {
                    ...prevState,
                    perks: updatedPerks,
                };
            }

            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    // const [loadingImage, setLoadingImage] = useState(false)

    const { title, address, perks, description, extraInfo, imageUrl, checkIn, checkOut, maxGuests } = placeData

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        <h2 className='text-2xl mt-4'>Title</h2>
                        <input type="text" placeholder='title' value={title} name='title' onChange={handleInputChange} />
                        <h2 className='text-2xl mt-4'>Address</h2>
                        <input type="text" placeholder='address' value={address} name='address' onChange={handleInputChange} />
                        <h2 className='text-2xl mt-4'>Photos</h2>
                        <div className='flex gap-2'>
                            <input type="url" value={imageUrl} name='imageUrl' onChange={handleInputChange} />
                            <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photos</button>
                        </div>
                        <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className='flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        <h2 className='text-2xl mt-4'>Description</h2>
                        <textarea name='description' value={description} onChange={handleInputChange} />
                        <h2 className='text-2xl mt-4'>Perks</h2>
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='wifi' checked={perks.includes("wifi")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                                <span>Wifi</span>
                            </label>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='freeParkingSpots' checked={perks.includes("freeParkingSpots")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <span>Free parking spots</span>
                            </label>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='tv' checked={perks.includes("tv")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span>TV</span>
                            </label>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='pets' checked={perks.includes("pets")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                                <span>Pets</span>
                            </label>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='privateEntrance' checked={perks.includes("privateEntrance")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>

                                <span>Private entrance</span>
                            </label>
                            <label className='border p-4 flex gap-2 rounded-2xl cursor-pointer'>
                                <input type="checkbox" name='heating' checked={perks.includes("heating")} onChange={handleInputChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                </svg>
                                <span>Heating</span>
                            </label>
                        </div>
                        <h2 className='text-2xl mt-4'>Extra info</h2>
                        <textarea name='extraInfo' value={extraInfo} onChange={handleInputChange} />
                        <h2 className='text-2xl mt-4'>Check-in & check-out</h2>
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input type="text" placeholder='14:00' value={checkIn} name='checkIn' onChange={handleInputChange} />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in out</h3>
                                <input type="text" placeholder='12:00' value={checkOut} name='checkOut' onChange={handleInputChange} />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                <input type="number" value={maxGuests} name='maxGuests' onChange={handleInputChange} />
                            </div>
                        </div>
                        <button className="primary my-4">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PlacesPage