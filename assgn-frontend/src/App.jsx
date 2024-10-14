import './App.css'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import SingUpLogin from './pages/SingUpLogin'
import User from './pages/User'
import Admin from './pages/Admin'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SingUpLogin />} />
        <Route element={(<Layout />)}>
          <Route path='/upload-assignment' element={<User />} />
          <Route path='/assignments' element={<Admin />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
