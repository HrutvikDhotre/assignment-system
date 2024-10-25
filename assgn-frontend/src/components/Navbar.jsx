import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi"
import { MdLogout } from "react-icons/md"
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setActiveMenu, currentColour, activeMenu, screenSize }) => {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className={`fixed z-[100]  ${activeMenu && screenSize > 576 ? 'vertical:w-[80%] collapsed:w-[95%] horizontal:w-full' : 'w-full'} px-7 backdrop-blur-lg backdrop-saturate-150  bg-white/30 dark:bg-gray-800/30 dark:shadow-skin:bg-gray-900/40`}>
      <div className="px-4 py-3 mt-7 flex justify-between sm:justify-end items-center rounded-md border border-gray-200 dark:border-gray-700 dark:shadow-skin:border-none  shadow-skin:shadow-main-shadow dark:shadow-skin:bg-gray-900/40 bg-white/70 dark:bg-gray-800/70 ">
        <button className='p-0 m-0 sm:hidden' onClick={() => setActiveMenu(prev => !prev)}>
          <GiHamburgerMenu
            className="text-2xl"
            style={{ color: currentColour }}
          />
        </button>
        <button
          className='p-0 m-0 text-red-600'
          onClick={handleLogout}
        >
          <MdLogout size={25} />
        </button>
      </div>
    </div>
  )
}

export default Navbar