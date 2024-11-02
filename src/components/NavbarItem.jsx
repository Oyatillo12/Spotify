import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarItem({item}) {
    return (
        <NavLink to={item.to} className={'flex items-center navlink space-x-5 opacity-[60%] mb-5 text-white'}>
            {item.icon}
            <span className='font-bold text-[18px] nav-text opacity-[60%]'>{item.title}</span>
        </NavLink>
    )
}

export default NavbarItem
