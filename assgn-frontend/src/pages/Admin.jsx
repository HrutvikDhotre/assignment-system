import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { message, Table, Popover, Button } from 'antd'
import axiosInstance from '../config/axiosConfig'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { useNavigate } from 'react-router-dom'


const Admin = () => {
  const [tableData, setTableData] = useState([])
  // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {})
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user.token)
        const response = await axios.get('http://localhost:3000/admins/assignments', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        console.log(response.data)
        const filteredData = response.data.map(item => ({
          userName: item.userId.name,
          task: item.task,
          status: item.status,
          _id: item._id,
        }))

        setTableData(filteredData)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/')
          message.error('Session expired, please login again.')
        }
        // else{
        //   console.log('above')
        //   console.log(error)
        //   message.error("Failed to fetch assignment details")
        // }
      }
    }
    fetchAssignmentDetails()
  }, [])


  const handleStatusChange = async (record, newStatus) => {
    try {
      const url = newStatus === 'rejected'
        ? `http://localhost:3000/admins/assignments/${record._id}/reject`
        : `http://localhost:3000/admins/assignments/${record._id}/accept`

      await axios.put(url, null, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })

      message.success(`Status updated`)
      setTableData(prev =>
        prev.map(item => (item._id === record._id ? { ...item, status: newStatus } : item))
      )
    } catch (error) {
      message.error("Failed to change status")
    }
  }

  const columns = [
    {
      title: 'Serial No',
      dataIndex: 'serialNo',
      key: 'serialNo',
      render: (text, record, index) => index + 1,
      responsive: ['sm'],
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Accepted', value: 'accepted' },
        { text: 'Pending', value: 'pending' },
        { text: 'Rejected', value: 'rejected' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text, record) => (
        <div className='flex items-end'>
          <span className='capitalize'>{record.status}</span>
          <Popover
            content={
              <div>
                <Button type="link" style={{ color: 'green' }} onClick={() => handleStatusChange(record, 'accepted')}>
                  Accept
                </Button>
                <Button type="link" style={{ color: 'red' }} onClick={() => handleStatusChange(record, 'rejected')}>
                  Reject
                </Button>
              </div>
            }
            trigger="hover"
          >
            <span style={{ cursor: 'pointer', marginLeft: 8 }}>⋮</span>
          </Popover>
        </div>
      ),
    }
  ]

  return (
    <div>
      <div className="container mx-auto p-4 h-screen">
        <h1 className="text-2xl font-bold text-center mb-4">Admin Assignments</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey="_id"
            scroll={{ x: 600 }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Admin

