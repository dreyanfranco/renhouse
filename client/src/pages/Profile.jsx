import { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProfileNav from '../components/ProfileNav';
import { AuthContext } from '../context/auth.context';
import PlacesPage from './PlacesPage';


const Account = () => {
    const { loadUser, user, logout } = useContext(AuthContext)

    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    if (!loadUser) {
        return 'Loading...';
    }

    if (loadUser && !user) {
        return <Navigate to={'/login'} />
    }



    return (
        <div>
            <ProfileNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto flex flex-col items-center'>
                    Logged in as {user.name} ({user.email})
                    <button onClick={logout} className='primary w-1/3 mt-2'>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}

export default Account