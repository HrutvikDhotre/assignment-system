import './App.css'
import Layout from './components/Layout'
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import SignUpLogin from './pages/SignUpLogin'
import User from './pages/User'
import Admin from './pages/Admin'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useAuthContext } from './contexts/AuthContextProvider'
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode"
import SelectRole from './pages/SelectRole'
function App() {

  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

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
      console.log(error)
      localStorage.removeItem('user')
      setUser(null)
      return true
    }
  }


  useEffect(() => {
    const handleRedirection = () => {
      const token = new URLSearchParams(location.search).get('token')
      const role = new URLSearchParams(location.search).get('role')

      if (token) {
        try {
          if (location.pathname !== '/select-role') {
            localStorage.setItem('user', JSON.stringify({ token: token, role: role }))
            setUser({ token: token, role: role })
            role === 'admin' ? navigate('/assignments') : navigate('/upload-assignment')
          } else {
            return
          }
        } catch (error) {
          console.error('Invalid token:', error)
          navigate('/')
        }
      } else {
        const storageUser = JSON.parse(localStorage.getItem('user'))
        if (!storageUser || isTokenExpired(storageUser.token)) {
          navigate('/')
        } else {
          setUser({ token: storageUser.token, role: storageUser.role })
          storageUser.role === 'admin' ? navigate('/assignments') : navigate('/upload-assignment')
        }
      }
    }
    handleRedirection()

  }, [])




  return (
    <>
      <Routes>
        <Route path='/' element={<SignUpLogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/select-role' element={<SelectRole />} />
          <Route element={<Layout />}>
            <Route path='/upload-assignment' element={<User />} />
            <Route path='/assignments' element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
