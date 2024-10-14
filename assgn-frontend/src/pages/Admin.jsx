// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { message, Table, Popover, Button } from 'antd'

// const Admin = () => {
//   const [tableData, setTableData] = useState([])
//   const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {})

//   useEffect(() => {
//     const fetchAssignmentDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/admins/assignments', {
//           params: {
//             adminId: user.userId,
//           }
//         })

//         const filteredData = response.data.map(item => ({
//           userName: item.userId.name,
//           task: item.task,
//           status: item.status,
//           _id: item._id,
//         }))

//         setTableData(filteredData)
//       } catch (error) {
//         message.error("Failed to fetch assignment details")
//       }
//     }
//     fetchAssignmentDetails()
//   }, [])

//   const handleStatusChange = async (record, newStatus) => {
//     try {
//       const url = newStatus === 'rejected' ? `http://localhost:3000/admins/assignments/${record._id}/reject` : `http://localhost:3000/admins/assignments/${record._id}/accept`
//       await axios.put(url)
//       message.success(`Status updated`)
//       setTableData(prev =>
//         prev.map(item => (item._id === record._id ? { ...item, status: newStatus } : item))
//       )
//     } catch (error) {
//       message.error("Failed to change status")
//     }
//   }

//   const columns = [
//     {
//       title: 'Serial No',
//       dataIndex: 'serialNo',
//       key: 'serialNo',
//       render: (text, record, index) => index + 1,
//       responsive: ['sm'],
//     },
//     {
//       title: 'User Name',
//       dataIndex: 'userName',
//       key: 'userName',
//     },
//     {
//       title: 'Task',
//       dataIndex: 'task',
//       key: 'task',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (text, record) => (
//         <div className='flex items-end'>
//           <span className='capitalize'>{record.status}</span>
//           <Popover
//             content={
//               <div>
//                 {/* <Button type="link" style={{ color: 'orange' }} onClick={() => handleStatusChange(record, 'pending')}>
//                   Pending
//                 </Button> */}
//                 <Button type="link" style={{ color: 'green' }} onClick={() => handleStatusChange(record, 'accepted')}>
//                   Accept
//                 </Button>
//                 <Button type="link" style={{ color: 'red' }} onClick={() => handleStatusChange(record, 'rejected')}>
//                   Reject
//                 </Button>
//               </div>
//             }
//             trigger="hover"
//           >
//             <span style={{ cursor: 'pointer', marginLeft: 8 }}>⋮</span>
//           </Popover>
//         </div>
//       ),
//     }
//   ]

//   return (
//     <div>
//       <div className="container mx-auto p-4 h-screen">
//         <h1 className="text-2xl font-bold text-center mb-4">Admin Assignments</h1>
//         <div className="overflow-x-auto">
//           <Table
//             columns={columns}
//             dataSource={tableData}
//             rowKey="_id"
//             scroll={{ x: 600 }}
//             pagination={{ pageSize: 5 }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Admin


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { message, Table, Popover, Button } from 'antd'

const Admin = () => {
  const [tableData, setTableData] = useState([])
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {})

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admins/assignments', {
          params: {
            adminId: user.userId,
          }
        })

        const filteredData = response.data.map(item => ({
          userName: item.userId.name,
          task: item.task,
          status: item.status,
          _id: item._id,
        }))

        setTableData(filteredData)
      } catch (error) {
        message.error("Failed to fetch assignment details")
      }
    }
    fetchAssignmentDetails()
  }, [user.userId])

  const handleStatusChange = async (record, newStatus) => {
    try {
      const url = newStatus === 'rejected'
        ? `http://localhost:3000/admins/assignments/${record._id}/reject`
        : `http://localhost:3000/admins/assignments/${record._id}/accept`

      await axios.put(url)
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
