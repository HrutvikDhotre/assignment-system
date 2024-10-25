import React from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { user, setUser } = useAuthContext()
  const location = useLocation()


  if (location.pathname === '/select-role') {
    const token = new URLSearchParams(location.search).get('token')
    console.log('protected',token)
    if (token) {
      return <Outlet />
    }
    return <Navigate to="/" />
  }

  return user ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes
