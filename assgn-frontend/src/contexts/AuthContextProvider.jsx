import React, { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({ token: '', role: '' })

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     if (user)
    //         setUser(user)
    // }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContextProvider