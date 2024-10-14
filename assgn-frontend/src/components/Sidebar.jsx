import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { links,adminLinks } from '../data/sidebardata'
import { useNavigate } from 'react-router-dom'


const Sidebar = ({ setActiveMenu, activeMenu, screenSize, currentColour }) => {

  const navigate = useNavigate()
  // const { user, setUser } = useStateContext(
    const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {})
  const handleClick = () => {
    if (screenSize && screenSize < 576) setActiveMenu(false)
  }

  const getAdminLinks = adminLinks.map((data) => (
    <div key={data.key} className="mt-3 horizontal:hidden">
      {data.links.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items py-2 my-2 px-1 font-semibold rounded-md 
            ${isActive ? 'text-white' : 'hover:bg-gray-100 dark-menu:hover:bg-gray-700 dark:hover:bg-gray-700 text-gray-600 dark-menu:text-gray-200 dark:text-gray-200'}`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColour : '',
          })}
          key={link.name}
          onClick={handleClick}
        >
          <span className="text-capitalize ms-2 ">
            <span className='collapsed:ms-0.5'>{link.icon}</span>
            <span className='collapsed:hidden '>{link.name}</span>
          </span>
        </NavLink>
      ))}
    </div>
  ))

  const getLinks = links.map((data) => (
    <div key={data.key} className="mt-3 horizontal:hidden">
      {data.links.map((link) => (
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `flex items py-2 my-2 px-1 font-semibold rounded-md 
            ${isActive ? 'text-white' : 'hover:bg-gray-100 dark-menu:hover:bg-gray-700 dark:hover:bg-gray-700 text-gray-600 dark-menu:text-gray-200 dark:text-gray-200'}`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColour : '',
          })}
          key={link.name}
          onClick={handleClick}
        >
          <span className="text-capitalize ms-2 ">
            <span className='collapsed:ms-0.5'>{link.icon}</span>
            <span className='collapsed:hidden '>{link.name}</span>
          </span>
        </NavLink>
      ))}
    </div>
  ))

  return (
    <>
      {activeMenu &&
        <div
          className={`dark:border-r  dark-menu:border-gray-700 dark:border-gray-700 border-r border-gray-200 shadow-skin:border-none shadow-skin:shadow-sidebar-shadow  fixed h-full bg-white dark-menu:bg-gray-800 dark:bg-gray-800  transition-all duration-300  ${screenSize < 576 ? 'w-[60%] z-[10000]' : 'z-[100] vertical:w-[20%] collapsed:w-16 horizontal:w-0'
            }`}
        >
          <div
            className={`fixed top-0 left-0 h-full p-4 collapsed:p-2 collapsed:-mt-5  overflow-auto ${screenSize > 576 ? 'w-[20%] vertical:w-[20%] collapsed:w-16' : 'w-60'} `}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl font-bold cursor-pointer mt-2 dark-menu:text-gray-50 dark:text-gray-50 collapsed:hidden vertical:block horizontal:hidden " >LOGO</span>
              <button className="md:hidden text-gray-600 dark:text-gray-50" onClick={() => setActiveMenu(false)}>
                <RxCross2 />
              </button>
            </div>
            <div className='flex flex-col justify-between h-6/7 collapsed:mt-6'>
              <div>{user.role === 'admin' ? getAdminLinks : getLinks}</div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default Sidebar





