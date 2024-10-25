import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { FcGoogle } from "react-icons/fc"
import { FaGoogle } from "react-icons/fa"

const SignUpLogin = () => {
    const [currentColour, setCurrentColour] = useState('#72CC50')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'user',
        fullName: ''
    })
    const [passwordError, setPasswordError] = useState('')
    const [validPasswordError, setValidPasswordError] = useState('')
    const [showLoginForm, setShowLoginForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user, setUser } = useAuthContext()

    useEffect(() => {
        const currColour = localStorage.getItem('currentColour')
        if (currColour) {
            setCurrentColour(currColour)
        }
    }, [])


    const handleFocus = (e) => {
        e.target.style.border = `1.5px solid ${currentColour}`
        e.target.style.outline = `1.5px solid ${currentColour}`
    }

    const handleBlur = (e) => {
        e.target.style.border = ''
        e.target.style.outline = 'none'
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))

        if (name === 'password') {
            validatePassword(value)
        }

        if ((name === 'confirmPassword' || name === 'password') && formData.confirmPassword) {
            if (formData.password !== value && name === 'confirmPassword') {
                setPasswordError('Passwords do not match')
            } else if (formData.password === value && name === 'confirmPassword') {
                setPasswordError('')
            }
        }
    }

    const validatePassword = (password) => {
        const minLength = 8
        const hasNumber = /\d/
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

        if (password.length < minLength) {
            setValidPasswordError('Password must be at least 8 characters long')
            return false
        }
        else if (!hasNumber.test(password)) {
            setValidPasswordError('Password must contain at least one number')
            return false
        }
        else if (!hasSpecialChar.test(password)) {
            setValidPasswordError('Password must contain at least one special character')
            return false
        } else {
            setValidPasswordError('')
        }
        return true
    }

    const handleLogin = async () => {
        const { username, password } = formData

        if (!username || !password) {
            message.error('Please fill in all fields')
            return
        }

        setLoading(true)

        try {
            const url = 'http://localhost:3000/login'
            const response = await axios.post(url, { username, password })

            if (response.status === 201) {
                message.success('Logged in successfully!')
                const { token, userRole } = response.data
                setUser({ token, role: userRole })
                localStorage.setItem('user', JSON.stringify({ token, role: userRole }))

                userRole === 'admin' ? navigate('/assignments') : navigate('/upload-assignment')
            } else if (response.status === 401) {
                message.error('Invalid credentials. Please try again.')
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                message.error('Server error. Please try again later.')
            } else {
                message.error('An error occurred while logging in')
            }
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        const { username, password, confirmPassword, userType, fullName } = formData

        if (!username || !password || !confirmPassword || !fullName) {
            message.error('Please fill in all fields')
            return
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match')
            message.error('Passwords do not match')
            return
        }

        setLoading(true)

        try {
            const url = 'http://localhost:3000/register'
            const response = await axios.post(url, {
                username,
                password,
                role: userType,
                name: fullName
            })

            if (response.status === 201) {
                message.success('Registered successfully!')
                setFormData({ username: '', password: '', confirmPassword: '', userType: 'user', fullName: '' })
                setShowLoginForm(true)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    message.error(error.response.data.message || "User already exists")
                } else {
                    message.error('An error occurred while registering')
                }
            } else {
                message.error('An error occurred while registering')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google'
    }

    return (
        <>
            {showLoginForm && (
                <div className='flex justify-center items-center min-h-screen w-full'>
                    <div className='w-full max-w-md shadow-login-shadow gap-y-6 rounded-lg flex flex-col items-center justify-center px-5 py-6'>
                        <div className='font-semibold text-3xl my-2 text-center'>
                            Login
                        </div>
                        <div className='w-full px-5 space-y-6'>
                            <input
                                required
                                type="text"
                                placeholder="Username"
                                name="username"
                                className='border border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.username}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                className='border border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.password}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='w-full px-5'>
                            <button
                                style={{ backgroundColor: currentColour }}
                                className='rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out hover:bg-opacity-0 text-white p-2'
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                className='mt-3 rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out  p-2 bg-blue-100 text-gray-900 flex justify-center items-center'
                            >
                                <FcGoogle className='mx-2' size={22} />    Login with Google
                            </button>
                            <button
                                className='float-end mt-1.5 p-0 text-blue-400 hover:text-blue-600 text-xs'
                                onClick={() => {
                                    setShowLoginForm(false)
                                    setFormData({ username: '', password: '', confirmPassword: '', userType: 'user' })
                                }}
                            >
                                Click here to Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!showLoginForm && (
                <div className='flex justify-center items-center min-h-screen w-full'>
                    <div className='w-full max-w-md shadow-login-shadow gap-y-6 rounded-lg flex flex-col items-center justify-center px-5 py-6'>
                        <div className='font-semibold text-3xl my-2 text-center'>
                            Register
                        </div>
                        <div className='w-full px-5'>
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                className='border mb-6 border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.fullName}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <input
                                required
                                type="text"
                                placeholder="Username"
                                name="username"
                                className='border border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.username}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Password"
                                name="password"
                                className='border mt-6 border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.password}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {validPasswordError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validPasswordError}
                                </p>
                            )}
                            <input
                                required
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                className='border mt-6 border-gray-200 rounded-md w-full p-2'
                                onChange={handleInputChange}
                                value={formData.confirmPassword}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {passwordError && (
                                <p className="text-red-500 text-xs mt-1">
                                    {passwordError}
                                </p>
                            )}
                            <div className="flex items-center space-x-4 mt-6">
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="user"
                                        checked={formData.userType === 'user'}
                                        onChange={handleInputChange}
                                        className='me-2'
                                    />
                                    User
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="admin"
                                        checked={formData.userType === 'admin'}
                                        onChange={handleInputChange}
                                        className='me-2'
                                    />
                                    Admin
                                </label>
                            </div>
                        </div>
                        <div className='w-full space-y-4 px-5'>
                            <button
                                style={{ backgroundColor: currentColour }}
                                className='rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out hover:bg-opacity-0 text-white p-2'
                                onClick={handleRegister}
                                disabled={loading || passwordError}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                className='rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out  p-2 bg-blue-100 text-gray-900 flex justify-center items-center'
                            >
                                <FcGoogle className='mx-2' size={22} />    Signup with Google
                            </button>
                            <button
                                className='float-end mt-1.5 p-0 text-blue-400 hover:text-blue-600 text-xs'
                                onClick={() => {
                                    setShowLoginForm(true)
                                    setFormData({ username: '', password: '', confirmPassword: '', userType: 'user' })
                                }}
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SignUpLogin
