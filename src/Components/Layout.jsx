import React from 'react'
import { Outlet } from "react-router"
import NavBar from './Navbar'
import Footer from './Footer'

function Layout ()  {
   
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <div className="flex-grow relative">
        <Outlet />
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout
