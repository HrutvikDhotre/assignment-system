import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ThemeSideBar from './ThemeSideBar'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(undefined)
  const [currentColour, setCurrentColour] = useState('#72CC50')

  useEffect(() => {
    const currentColour = localStorage.getItem('currentColour')
    currentColour ? setCurrentColour(currentColour) : ''
  }, [])

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      document.documentElement.classList.remove('collapsed', 'horizontal')
    }
  }, [setScreenSize])

  const updateBreakpoint = () => {
    if (window.innerWidth < 960) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }

  useEffect(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => {
      window.removeEventListener('resize', updateBreakpoint)
    }
  }, [setActiveMenu])



  return (
    <>
      <div className="flex relative">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          screenSize={screenSize}
          currentColour={currentColour}
        />
        <div
          className={`flex-grow flex-shrink w-[80%] bg-white dark:bg-gray-800 ${screenSize < 576 ? 'ml-0' : 'vertical:ml-[20%] collapsed:ml-16 horizontal:ml-0'
            } shadow-skin:bg-main dark:shadow-skin:bg-gray-900`}
        >
          <div className="px-5 ">
            <Outlet context={{ currentColour }} />
          </div>
        </div>
      </div>
      <ThemeSideBar
        currentColour={currentColour}
        setCurrentColour={setCurrentColour}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </>
  )
}

export default Layout
