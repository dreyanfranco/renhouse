import { createContext, useEffect, useState } from "react"
import authService from '../services/auth.service'

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null)
    const [loadUser, setLoadUser] = useState(false)

    const authenticateUser = () => {

        const token = localStorage.getItem('authToken')

        if (token) {
            authService
                .verify(token)
                .then(({ data }) => {
                    setUser(data)
                    setLoadUser(true)
                })
                .catch(err => logout())
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        setUser(null)
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ authenticateUser, user, logout, loadUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }