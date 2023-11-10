import bg from '../assets/bg.png'
const Hero = () => {
    return (
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto text-center z-10 xl:max-w-3xl">
                <h1 className="text-4xl font-bold leading sm:text-5xl text-white">Every home is a destination</h1>
                <p className='text-white'>The best of Luxury Retreats is now Flowbite Luxe—offering the world's most extraordinary homes with the highest standard of service.</p>
                {/* <div className="flex flex-wrap justify-center">
                    <button className="px-8 py-3 m-2 text-lg font-semibold rounded">Login</button>
                    <button className="px-8 py-3 m-2 text-lg border rounded">Learn more</button>
                </div> */}
            </div>
        </section>
    )
}

export default Hero