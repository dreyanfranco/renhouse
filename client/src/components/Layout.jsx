import { Outlet } from 'react-router'
import Header from './Header'

const Layout = () => {
    return (
        <div className='py-4 flex flex-col mx-auto'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout