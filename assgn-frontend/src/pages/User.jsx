import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const User = () => {
  const { currentColour } = useOutletContext();
  const [formData, setFormData] = useState({ task: '', adminId: '' });
  const [adminOptions, setAdminOptions] = useState([])
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {})
  // const adminOptions = [
  //   { id: '1', name: 'Admin 1' },
  //   { id: '2', name: 'Admin 2' },
  //   { id: '3', name: 'Admin 3' },
  // ];

  useEffect(() => {
    const fetchAdminOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/admins')
        const options = response.data.map((data) => {
          return {
            name: data.name,
            id: data._id
          }
        })
        setAdminOptions(options)
      } catch (err) {
        message.error("Failed to fetch admin data")
      }
    }
    fetchAdminOptions()
  }, [])

  const handleFocus = (e) => {
    e.target.style.border = `1.5px solid ${currentColour}`;
    e.target.style.outline = `1.5px solid ${currentColour}`;
  };

  const handleBlur = (e) => {
    e.target.style.border = '';
    e.target.style.outline = 'none';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    try {
      console.log(formData)
      console.log(user)
      const response = await axios.post('http://localhost:3000/users/upload', {
        userId: user.userId,
        adminId: formData.adminId,
        task: formData.task
      })

      if (response.status === 201) {
         message.success('Assignment uploaded successfully')
         setFormData({ task: '', adminId: '' })
      }
    } catch (error) {
      console.log(error)
      message.error("Something went wrong while uploading task")
    }
  }

  return (
    <>
      <div className='flex justify-center items-center min-h-screen w-full'>
        <div className='bg-white w-full max-w-md shadow-login-shadow gap-y-6 rounded-lg flex flex-col items-center justify-center px-5 py-6'>
          <div className='font-semibold text-3xl my-2 text-center'>
            Upload Assignment
          </div>
          <div className='w-full px-5'>
            <input
              required
              type="text"
              placeholder="Task"
              name="task"
              className='border mb-6 border-gray-200 rounded-md w-full p-2'
              onChange={handleInputChange}
              value={formData.task}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <select
              required
              name="adminId"
              className='border border-gray-200 rounded-md w-full p-2'
              onChange={handleInputChange}
              value={formData.adminId}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              <option value="" disabled>
                Select Admin
              </option>
              {adminOptions.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div>

          <div className='w-full px-5'>
            <button
              style={{ backgroundColor: currentColour }}
              className='rounded-md w-full active:scale-105 transition-transform duration-300 ease-in-out hover:bg-opacity-0 text-white p-2'
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
