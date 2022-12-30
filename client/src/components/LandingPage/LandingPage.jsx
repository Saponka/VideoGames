import React from 'react'
import { Link } from 'react-router-dom';
import '../LandingPage/landing.css'
const LandingPage = () => {
  return (
    
       <div className='container'>
        
          <div className='link'>
          <h1 className='h1'>Video Games </h1>
          <h1 className='h1'>Dungeon</h1>
          <Link to='/home' ><button className='btn'>Press Start</button></Link>
          </div>
           <img src="https://cdn.wallpapersafari.com/64/65/YflnOP.gif" alt=""  /> 
        </div>
    
  )
}

export default LandingPage
