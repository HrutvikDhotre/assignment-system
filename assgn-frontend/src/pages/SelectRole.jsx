import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
const SelectRole = () => {
    const [role, setRole] = useState('')
    const { user, setUser } = useAuthContext()
    const navigate = useNavigate()
    const [currentColour, setCurrentColour] = useState('#72CC50')


    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        console.log('select role', token)
        if (!token) {
            navigate('/')
        }

    }, [])

    useEffect(() => { }, [user])

    const handleRoleSelection = async (e) => {
        e.preventDefault()
        try {
            const token = new URLSearchParams(window.location.search).get('token');
            if (token && role) {
                const response = await axios.put('http://localhost:3000/users/assign-role', { role }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 201) {
                    message.success('Role assigned successfully!')
                    response.data.userRole === 'admin' ? navigate('/assignments') : navigate('/upload-assignment')
                    setUser({ token: response.data.token, role: response.data.userRole })
                    localStorage.setItem('user', JSON.stringify({ token: response.data.token, role: response.data.userRole }))
                }
            }
        } catch (error) {
            message.error("Something wen't wrong while assiging role.")
        }
    }

    const handleFocus = (e) => {
        e.target.style.border = `1.5px solid ${currentColour}`
        e.target.style.outline = `1.5px solid ${currentColour}`
    }

    const handleBlur = (e) => {
        e.target.style.border = ''
        e.target.style.outline = 'none'
    }


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-full max-w-md shadow-login-shadow  rounded-lg flex flex-col items-center justify-center px-5 py-6'>
                <form
                    className='w-full gap-y-4  flex flex-col items-center justify-center p-0'
                    onSubmit={handleRoleSelection}
                >
                    <h2>Select Your Role</h2>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='border border-gray-200 rounded-md w-full p-2'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required

                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        style={{ backgroundColor: currentColour }}
                        className='rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out hover:bg-opacity-0 text-white p-2'
                        // onClick={handleRoleSelection}
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SelectRole;
