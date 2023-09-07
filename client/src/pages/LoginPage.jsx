import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import authService from '../services/auth.service';


const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const { authenticateUser, user } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await authService.login(loginData);
            localStorage.setItem('authToken', data.authToken);
            authenticateUser();
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    <input type='email' placeholder='email.com' name='email' value={loginData.email} onChange={handleInputChange} />
                    <input type="password" placeholder='password' name='password' value={loginData.password} onChange={handleInputChange} />
                    <button className='primary w-full'>Login</button>
                    <div className='text-center py-2 text-gray-500 '>Don't have an account yet? <Link to={'/register'} className='underline text-black'>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage