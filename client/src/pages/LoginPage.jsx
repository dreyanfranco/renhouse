import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/auth.service';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            await login({
                email, password
            })
            alert('Login succesful')
        } catch (error) {
            alert('Login not succesful')
        }

    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                    <input type='email' placeholder='email.com' value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={event => setPassword(event.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500 '>Don't have an account yet? <Link to={'/register'} className='underline text-black'>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage