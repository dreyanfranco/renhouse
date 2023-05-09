import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../services/auth.service';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();
        try {
            await register({
                name, email, password
            });
            alert('Registration succesful')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type='text' placeholder='John Doe' name='name' value={name} onChange={event => setName(event.target.value)} />
                    <input type='email' placeholder='example@email.com' name='email' value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="password" placeholder='password' name='password' value={password} onChange={event => setPassword(event.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2 text-gray-500 '>Already a member? <Link to={'/login'} className='underline text-black'>Login now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage