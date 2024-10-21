import React from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
const ProtectedRoutes = () => {
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token)
      const isExpired = exp < Date.now() / 1000

      if (isExpired) {
        localStorage.removeItem('user')
        setUser(null)
      }

      return isExpired
    } catch (error) {
      localStorage.removeItem('user')
      return true
    }
  }

  return user  ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoutes
