import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav';
import renhouseService from '../services/renhouse.service';
import uploadService from '../services/upload.service';



const PlacesFormPage = () => {
    const navigate = useNavigate()
    const [placeData, setPlaceData] = useState({
        title: '',
        address: '',
        perks: [],
        description: '',
        extraInfo: '',
        imageUrl: [],
        checkIn: '',
        checkOut: '',
        maxGuests: 1,
        price: 0
    })
    const [loadingImage, setLoadingImage] = useState(false)

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

    const handleFileUpload = e => {
        setLoadingImage(true);

        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('imageData', files[i]);
        }

        uploadService
            .uploadImages(formData)
            .then(res => {
                const cloudinaryUrls = res.data.cloudinary_url;
                setPlaceData({ ...placeData, imageUrl: [...placeData.imageUrl, ...cloudinaryUrls] });
                setLoadingImage(false);
            })
            .catch(error => console.log(error));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        try {
            await renhouseService.newPlace(placeData)
            navigate('/account/places')
        } catch (error) {
            console.log('Error creating new place:', error)
        }
    }

    const handleRemovePhoto = (event, url) => {
        event.preventDefault()
        const removePhotos = placeData.imageUrl.filter(imageUrl => imageUrl !== url)
        setPlaceData({
            ...placeData,
            imageUrl: removePhotos
        })
    }

    const handleMainPhoto = (event, url) => {
        event.preventDefault()
        // Find the index of the selected URL in the image array
        const selectedIndex = placeData.imageUrl.findIndex(imageUrl => imageUrl === url);

        if (selectedIndex !== -1) {
            // Swap the selected photo with the first photo in the array
            const updatedImages = [...placeData.imageUrl];
            [updatedImages[0], updatedImages[selectedIndex]] = [updatedImages[selectedIndex], updatedImages[0]];

            // Update the state with the rearranged images
            setPlaceData({ ...placeData, imageUrl: updatedImages });

        }
    }

    const { title, address, perks, description, extraInfo, imageUrl, checkIn, checkOut, maxGuests, price } = placeData
    return (
        <div>
            <ProfileNav />
            <form className='xl:w-6/12 mx-auto' onSubmit={handleFormSubmit}>
                <h2 className='text-2xl mt-4'>Title</h2>
                <input type="text" placeholder='title' value={title} name='title' onChange={handleInputChange} />
                <h2 className='text-2xl mt-4'>Address</h2>
                <input type="text" placeholder='address' value={address} name='address' onChange={handleInputChange} />
                <h2 className='text-2xl mt-4'>Photos</h2>
                <p>Add photos</p>
                <div className="mt-2 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
                    <label className="h-24 w-32 max-w-xs cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                        <input type="file" className='hidden' multiple onChange={handleFileUpload} />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Upload
                    </label>
                    {imageUrl.length > 0 && imageUrl.map((url, index) => (
                        <div className='h-24 w-32 max-w-xs flex relative' key={index}>
                            <img className='rounded-2xl w-full object-cover' src={url} />
                            <button onClick={event => handleRemovePhoto(event, url)} className="cursor absolute bottom-1 right-1 text-red-500 bg-black bg-opacity-50 rounded-2xl px-3 py-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <button onClick={event => handleMainPhoto(event, url)} className="cursor absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl px-3 py-2">
                                {url === imageUrl[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {url !== imageUrl[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
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
                <div className='grid gap-2 sm:grid-cols-4'>
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
                    <div>
                        <h3 className='mt-2 -mb-1'>Price</h3>
                        <input type="number" value={price} name='price' onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="primary my-4 w-1/3">Save</button>
                </div>
            </form>
        </div>
    )
}

export default PlacesFormPage