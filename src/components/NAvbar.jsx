import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, LibraryIcon, LikedIcon, PlayListIcon, SearchIcon } from '../assets/images/icon'
import { PATH } from '../hooks/usePath'
import NavbarItem from './NavbarItem'

function NAvbar() {
    const navbarList = [ 
        {
            id:1,
            title:"Home",
            icon:<HomeIcon/>,
            to:'/'
        },
        {
            id:2,
            title:"Search",
            icon:<SearchIcon/>,
            to:PATH.search
        },
        {
            id:3,
            title:"Your Library",
            icon:<LibraryIcon/>,
            to:"#"
        },
        {
            id:4,
            title:"Create Playlist",
            icon:<PlayListIcon/>,
            to:"#"
        },
        {
            id:5,
            title:"Liked Songs",
            icon:<LikedIcon/>,
            to:PATH.liked
        },
    ]
  return (
    <div className='w-[20%] overflow-y-auto z-10 h-[100vh] bg-black gap-y-5'>
      <div className='pl-[30px] pt-[70px]'>
        {navbarList.map(item => <NavbarItem key={item.id} item={item}/>)}
      </div>
    </div>
  )
}

export default NAvbar
