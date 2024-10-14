import React from 'react'
import { IoMdSettings } from "react-icons/io"
import { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx"
import { colours } from '../data/sidebardata'
import { IoSunnyOutline } from "react-icons/io5"
import { BsMoonStars } from "react-icons/bs"
const ThemeSideBar = ({ darkMode, setDarkMode, currentColour, setCurrentColour }) => {

    const [themeActive, setThemeActive] = useState(false)
    const [skin, setSkin] = useState(true)
    const [layout, setLayout] = useState('vertical')
    const [semiDarkMenu, setSemiDarkMenu] = useState(false)


    const renderColourBlocks = colours.map((colour, index) => {
        return (
            <span
                key={index}
                className='rounded-md p-0.5 w-12 h-12 flex justify-center items-center border hover:cursor-pointer '
                onClick={() => {
                    setCurrentColour(colour); localStorage.setItem('colourMode', colour);
                }}
                style={{
                    border: `1px solid ${colour === currentColour ? colour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                    outline: `${colour === currentColour ? `1px solid ${colour}` : 'none'}`
                }}
            >
                <div className='rounded-md w-7 h-7 m-0 p-0'
                    style={{
                        backgroundColor: colour
                    }}
                >
                </div>
            </span>
        )
    })

    const handleModeToggle = () => {
        setDarkMode(!darkMode)
    }

    const handleSkinToggle = () => {
        setSkin(!skin)
    }

    const handleLayout = (layoutType) => {
        setLayout(layoutType)
    }

    useEffect(() => {
        document.documentElement.classList.add(layout)
        return () => {
            document.documentElement.classList.remove('vertical', 'collapsed', 'horizontal')
        }
    }, [layout])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    useEffect(() => {
        if (semiDarkMenu) {
            document.documentElement.classList.add('dark-menu')
        } else {
            document.documentElement.classList.remove('dark-menu')
        }
    }, [semiDarkMenu])

    useEffect(() => {
        if (skin) {
            document.documentElement.classList.add('shadow-skin')
        } else {
            document.documentElement.classList.remove('shadow-skin')
        }
    }, [skin])



    return (
        <>
            <span
                className='fixed max-md:hidden p-2 right-0 top-32 z-10002 me-1 rounded-l-lg hover:cursor-pointer shadow-lg'
                style={{ backgroundColor: currentColour }}
                onClick={() => setThemeActive(true)}
            >
                <IoMdSettings color='white' size={23} />
            </span>

            <div
                className={`fixed inset-0 z-10003 bg-black bg-opacity-50 transition-opacity duration-300 ${themeActive ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={(e) =>{ 
                    e.stopPropagation()
                    setThemeActive(false)
                }}
            />

            <div
                className={`fixed  top-0 right-0 h-full dark:bg-gray-800 bg-white z-10003 shadow-sidebar-shadow overflow-auto w-auto transform transition-transform duration-300 ${themeActive ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className='w-96 px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-800'>
                    <div className='inline-flex flex-col dark:text-gray-50 text-gray-500'>
                        <span className='text-md font-semibold'>Theme Customiser</span>
                        <span className='text-xs'>Customize your theme</span>
                    </div>
                    <span className='hover:cursor-pointer'>
                        <RxCross2
                            size={20}
                            className='dark:text-gray-100 text-gray-500'
                            onClick={() => setThemeActive(false)}
                        />
                    </span>
                </div>
                <div className='mt-2 px-5 py-5 border-b border-gray-200 dark:border-gray-700'>
                    <div>
                        <span
                            className='px-2 py-1 rounded-md  text-xs'
                            style={{
                                color: `${currentColour}`,
                                backgroundColor: `${currentColour}33`,
                            }}
                        >
                            Theming
                        </span>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='text-sm dark:text-gray-50 text-gray-600'>Primary Colour</div>
                        <div className='flex gap-3'>
                            {renderColourBlocks}
                        </div>
                    </div>
                    {/* <div className='flex flex-col gap-3 mt-5'>
                        <div className='text-sm dark:text-gray-50 text-gray-600'>Theme</div>
                        <div className='flex gap-3'>
                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md p-1 w-28 h-12 py-6 flex justify-center items-center '
                                    onClick={handleModeToggle}
                                    style={{
                                        border: `1px solid ${!darkMode ? currentColour : '#6b7280'}`,
                                        outline: ` ${!darkMode ? `1px solid ${currentColour}` : 'none'}`,
                                        backgroundColor: `${!darkMode ? `${currentColour}26` : 'transparent'}`,
                                    }}
                                >
                                    <IoSunnyOutline
                                        style={{
                                            color: !darkMode ? currentColour : '#e5e7eb'
                                        }}
                                        size={25}
                                    />
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Light</span>
                            </div>
                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md p-1 w-28 h-12 py-6 flex justify-center items-center '
                                    onClick={handleModeToggle}
                                    style={{
                                        border: `1px solid ${darkMode ? currentColour : '#e5e7eb'}`,
                                        outline: ` ${darkMode ? `1px solid ${currentColour}` : 'none'}`,
                                    }}
                                >
                                    <BsMoonStars style={{
                                        color: darkMode ? currentColour : 'rgb(180, 180, 180)',
                                    }}
                                        size={23} />
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Dark</span>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className='flex flex-col gap-3 mt-5'>
                        <div className='text-sm dark:text-gray-50 text-gray-600'>Skins</div>
                        <div className='flex gap-3'>
                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md  flex justify-center items-center '
                                    onClick={handleSkinToggle}
                                    style={{
                                        border: `1px solid ${!skin ? currentColour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                                        outline: ` ${!skin ? `1px solid ${currentColour}` : 'none'}`
                                    }}
                                >
                                    <svg color={darkMode ? 'white' : ''} data-v-638132f3="" xmlns="http://www.w3.org/2000/svg" width="104" height="66" fill="none" class="custom-radio-image"><rect width="104" height="66" fill="currentColor" fill-opacity=".02" rx="4"></rect><path fill="currentColor" fill-opacity=".08" d="M0 4a4 4 0 0 1 4-4h23.472v66H4a4 4 0 0 1-4-4z"></path><rect width="17.66" height="2.789" x="4.906" y="23.884" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="9.811" height="9.706" x="8.83" y="5.881" fill="currentColor" fill-opacity=".3" rx="2"></rect><rect width="17.66" height="2.789" x="4.906" y="34.438" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="44.992" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="55.546" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="64.755" height="8.8" x="34.115" y="4.672" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="3.925" height="4.4" x="37.039" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="80.21" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="86.096" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="91.982" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="40.226" height="17.6" x="58.484" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="19.046" height="17.6" x="34.115" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="64.755" height="17.6" x="34.115" y="42.455" fill="currentColor" fill-opacity=".08" rx="2"></rect></svg>
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Bordered</span>
                            </div>
                            <div className='flex flex-col'>

                                <span
                                    className='hover:cursor-pointer rounded-md flex justify-center items-center '
                                    onClick={handleSkinToggle}
                                    style={{
                                        border: `1px solid ${skin ? currentColour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                                        outline: ` ${skin ? `1px solid ${currentColour}` : 'none'}`
                                    }}
                                >
                                    <svg color={darkMode ? 'white' : ''} data-v-638132f3="" xmlns="http://www.w3.org/2000/svg" width="104" height="66" fill="none" class="custom-radio-image"><rect width="104" height="66" fill="currentColor" fill-opacity=".02" rx="4"></rect><rect width="17.66" height="2.789" x="4.906" y="23.884" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="9.811" height="9.706" x="8.83" y="5.881" fill="currentColor" fill-opacity=".3" rx="2"></rect><rect width="17.66" height="2.789" x="4.906" y="34.438" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="44.992" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="55.546" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="63.755" height="7.8" x="34.615" y="5.172" stroke="currentColor" stroke-opacity=".12" rx="1.5"></rect><rect width="3.925" height="4.4" x="37.039" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="80.21" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="86.096" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="91.002" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="39.226" height="16.6" x="58.984" y="20.113" stroke="currentColor" stroke-opacity=".12" rx="1.5"></rect><rect width="18.046" height="16.6" x="34.615" y="20.113" stroke="currentColor" stroke-opacity=".12" rx="1.5"></rect><rect width="63.755" height="16.6" x="34.615" y="42.955" stroke="currentColor" stroke-opacity=".12" rx="1.5"></rect></svg>
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Default</span>
                            </div>

                        </div>
                    </div> */}
                    <div className='dark:hidden mt-10  flex justify-between items-center'>
                        <span className='text-sm text-gray-600'>
                            Semi Dark Menu
                        </span>
                        <button className='rounded-xl w-10 h-5 px-0.5 py-0.5 dark-menu:shadow-lg'
                            onClick={() => setSemiDarkMenu(prev => !prev)}
                            style={{
                                backgroundColor: semiDarkMenu ? currentColour : '#e5e7eb'
                            }}>
                            <div className='rounded-full w-4 h-4 bg-white dark-menu:float-end' ></div>
                        </button>
                    </div>
                </div>


                <div className='mt-2 px-5 py-5'>
                    <div>
                        <span
                            className='px-2 py-1 rounded-md bg-gray-50 text-xs'
                            style={{
                                color: `${currentColour}`,
                                backgroundColor: `${currentColour}33`,
                            }}
                        >
                            Layout
                        </span>
                    </div>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='text-sm dark:text-gray-50 text-gray-600'>Layout</div>
                        <div className='flex gap-3'>
                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md  flex justify-center items-center '
                                    onClick={() => handleLayout('vertical')}
                                    style={{
                                        border: `1px solid ${layout === 'vertical' ? currentColour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                                        outline: ` ${layout === 'vertical' ? `1px solid ${currentColour}` : 'none'}`
                                    }}
                                >
                                    <svg color={darkMode ? 'white' : ''} data-v-638132f3="" xmlns="http://www.w3.org/2000/svg" width="104" height="66" fill="none" class="custom-radio-image"><rect width="104" height="66" fill="currentColor" fill-opacity=".02" rx="4"></rect><path fill="currentColor" fill-opacity=".08" d="M0 4a4 4 0 0 1 4-4h23.472v66H4a4 4 0 0 1-4-4z"></path><rect width="17.66" height="2.789" x="4.906" y="23.884" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="9.811" height="9.706" x="8.83" y="5.881" fill="currentColor" fill-opacity=".3" rx="2"></rect><rect width="17.66" height="2.789" x="4.906" y="34.438" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="44.992" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="17.66" height="2.789" x="4.906" y="55.546" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="64.755" height="8.8" x="34.115" y="4.672" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="3.925" height="4.4" x="37.039" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="80.21" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="86.096" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="91.982" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="40.226" height="17.6" x="58.484" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="19.046" height="17.6" x="34.115" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="64.755" height="17.6" x="34.115" y="42.455" fill="currentColor" fill-opacity=".08" rx="2"></rect></svg>
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Vertical</span>
                            </div>
                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md flex justify-center items-center '
                                    onClick={() => handleLayout('collapsed')}
                                    style={{
                                        border: `1px solid ${layout === 'collapsed' ? currentColour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                                        outline: ` ${layout === 'collapsed' ? `1px solid ${currentColour}` : 'none'}`
                                    }}
                                >
                                    <svg color={darkMode ? 'white' : ''} data-v-638132f3="" xmlns="http://www.w3.org/2000/svg" width="104" height="66" fill="none" class="custom-radio-image"><rect width="104" height="66" fill="currentColor" fill-opacity=".02" rx="4"></rect><path fill="currentColor" fill-opacity=".04" d="M0 4a4 4 0 0 1 4-4h9.736v66H4a4 4 0 0 1-4-4z"></path><rect width="7.849" height="2.789" x="2.943" y="23.884" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="6.868" height="6.794" x="3.434" y="5.881" fill="currentColor" fill-opacity=".3" rx="2"></rect><rect width="7.849" height="2.789" x="2.943" y="34.438" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="7.849" height="2.789" x="2.943" y="44.992" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="7.849" height="2.789" x="2.943" y="55.546" fill="currentColor" fill-opacity=".3" rx="1.395"></rect><rect width="75.437" height="8.8" x="21.472" y="4.672" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="3.925" height="4.4" x="25.617" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="78.248" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="84.135" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="3.925" height="4.4" x="90.022" y="6.872" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="46.821" height="17.6" x="50.491" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="22.168" height="17.6" x="21.472" y="19.613" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="75.841" height="17.6" x="21.472" y="42.455" fill="currentColor" fill-opacity=".08" rx="2"></rect></svg>
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Collapsed</span>
                            </div>

                            <div className='flex flex-col'>
                                <span
                                    className='hover:cursor-pointer rounded-md flex justify-center items-center '
                                    onClick={() => handleLayout('horizontal')}
                                    style={{
                                        border: `1px solid ${layout === 'horizontal' ? currentColour : darkMode ? '#6b7280' : '#e5e7eb'}`,
                                        outline: ` ${layout === 'horizontal' ? `1px solid ${currentColour}` : 'none'}`
                                    }}
                                >
                                    <svg color={darkMode ? 'white' : ''} data-v-638132f3="" xmlns="http://www.w3.org/2000/svg" width="104" height="66" fill="none" class="custom-radio-image"><rect width="104" height="66" fill="currentColor" fill-opacity=".02" rx="4"></rect><rect width="46.821" height="17.6" x="44.007" y="19.614" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="22.168" height="17.6" x="14.985" y="19.614" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="75.841" height="17.6" x="14.985" y="42.455" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="74.151" height="9.01" x="14.925" y="4.689" fill="currentColor" fill-opacity=".08" rx="2"></rect><rect width="6.003" height="5.38" x="20.026" y="6.504" fill="currentColor" fill-opacity=".3" rx="1"></rect><rect width="6.637" height="2.461" x="33.877" y="7.964" fill="currentColor" fill-opacity=".3" rx="1.231"></rect><rect width="6.637" height="2.461" x="48.365" y="7.964" fill="currentColor" fill-opacity=".3" rx="1.231"></rect><rect width="6.637" height="2.461" x="62.851" y="7.964" fill="currentColor" fill-opacity=".3" rx="1.231"></rect><rect width="6.637" height="2.461" x="77.338" y="7.964" fill="currentColor" fill-opacity=".3" rx="1.231"></rect></svg>
                                </span>
                                <span className='text-xs mt-2 dark:text-gray-50 text-gray-400'>Horizontal</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ThemeSideBar


