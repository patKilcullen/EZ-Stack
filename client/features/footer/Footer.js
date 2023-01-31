import React from 'react'
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div id = "footerbox">
        <Link to= "/contact" className = "contact">Contact Us</Link>  
        <Link to= "/AboutUs" className = "aboutUs"> About Us</Link>
    </div>
  )
}

export default Footer