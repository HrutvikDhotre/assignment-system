import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import SignUpLogin from './pages/SignUpLogin'
import User from './pages/User'
import Admin from './pages/Admin'
import ProtectedRoutes from './components/ProtectedRoutes'
import { useAuthContext } from './contexts/AuthContextProvider'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

function App() {

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
      console.log(error)
      localStorage.removeItem('user')
      return true
    }
  }

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user'))
    if (!storageUser) {
      navigate('/')
    } else if (isTokenExpired(storageUser.token)) {
      navigate('/')
    } else {
      setUser(storageUser)
      storageUser.role === 'admin' ? navigate('/assignments') : navigate('/upload-assignment')
    }

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<SignUpLogin />} />
        <Route element={<ProtectedRoutes />}>
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
