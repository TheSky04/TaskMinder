import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css"
import { useLocation } from 'react-router-dom'

function NavLink({children,to = "/",logo,isActive = false}) {

  const isActivePath = useLocation().pathname === to;


  return (
    <Link
      to={to}
      className={`${isActivePath ? "menuLink--active text-violet-800 " : ""} flex text-2xl text-gray-500 items-center gap-3 font-bold specialLink pl-14  py-5 cursor-pointer mb-5`}
    >
      <span>{logo}</span>
      {children}
    </Link>
  )
}

export default NavLink