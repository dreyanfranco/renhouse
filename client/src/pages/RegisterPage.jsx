import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/auth.service';

const RegisterPage = () => {

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleInputChange = event => {
        const { value, name } = event.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await authService.register(signupData);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className='max-w-md mx-auto' onSubmit={handleFormSubmit}>
                    <input type='text' placeholder='John Doe' name='name' value={signupData.name} onChange={handleInputChange} />
                    <input type='email' placeholder='example@email.com' name='email' value={signupData.email} onChange={handleInputChange} />
                    <input type="password" placeholder='password' name='password' value={signupData.password} onChange={handleInputChange} />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500 '>Already a member? <Link to={'/login'} className='underline text-black'>Login now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage