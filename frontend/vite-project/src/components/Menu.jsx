import React from 'react'
import NavLink from './NavLink'
import { homeLogo,projectLogo,clientsLogo,analyticsLogo,calenderLogo,messageLogo,reportsLogo,settingLogo} from "../../icons/icons"

function Menu() {

  return (
    <div style={{height: 'calc(100vh - 85px)'}} className='h-screen'>
        <NavLink logo={homeLogo} to="/tasks" isActive="true">Tasks</NavLink>
        <NavLink logo={projectLogo} to="/projects">Projects</NavLink>
        <NavLink logo={clientsLogo} to="/clients">Clients</NavLink>
        <NavLink logo={analyticsLogo} to="/analytics">Analytics</NavLink>
        <NavLink logo={calenderLogo} to="/calender">Calender</NavLink>
        <NavLink logo={messageLogo} to="/message">Message</NavLink>
        <NavLink logo={reportsLogo} to="/reports">Reports</NavLink>
        <NavLink logo={settingLogo} to="/settings">Settings</NavLink>
    </div>
  )
}

export default Menu