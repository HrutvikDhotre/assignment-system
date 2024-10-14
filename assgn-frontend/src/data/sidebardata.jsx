
import { GoHomeFill } from "react-icons/go"
import { nanoid } from 'nanoid'
import { MdProductionQuantityLimits } from "react-icons/md"
import { FaHistory } from "react-icons/fa"


export const links = [
    {
        key: nanoid(),
        title: 'Home',
        links: [
            {
                name: 'Upload',
                path: '/upload-assignment',
                icon: <GoHomeFill size={20} className="inline me-3 mb-1" />
            },
            // {
            //     name: 'Fetch Admins',
            //     path: '/fetch-admins',
            //     icon: <GoHomeFill size={20} className="inline me-3 mb-1" />
            // },
        ]
    },
]

export const adminLinks = [
    {
        key: nanoid(),
        title: 'Home',
        links: [
            {
                name: 'Home',
                path: '/assignments',
                icon: <GoHomeFill size={20} className="inline me-3 mb-1" />
            },
        ]
    },
]





export const colours = ['#72CC50', '#03C9D7', '#1E4DB7', '#FB9678']
