import React from 'react'
import {Outlet} from "react-router-dom"
import "../index.css"
import TaskMinderLogo from "../assets/TaskMinderLogo.png"
import Menu from '../components/Menu'
import Header from '../components/Header'



function Layout() {
  return (
    <div className='grid grid-cols-[30rem_1fr] h-screen'>
        <div style={{ borderRight:'1px solid #f1f3f5'}}>
          <div className='py-7'>
            <img src={TaskMinderLogo} width="200" alt="Task Logo" className='pl-14'/>
          </div>
          <Menu></Menu>
        </div>
        <div className='h-screen'>
            <Header></Header>
            <div style={{height:'calc(100vh - 10.4rem)',backgroundColor:'#F6FAFF'}}>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout