import React from 'react';
import { Link } from 'react-router-dom' ;
//css
import  styles from '../LandingPage/landing.module.css';

const LandingPage = () => {
  return (
    
       <div className={styles.container}>
           <div className={styles.link}>
           <h1 className={styles.h1}>Video Games</h1>
           <h1 className={styles.h1}>Dungeon</h1>
           <Link to='/home'><button className={styles.btn}>Press Start</button></Link>
           </div>
           <img src="https://cdn.wallpapersafari.com/64/65/YflnOP.gif" alt=""  /> 
       </div>
    
  )
}

export default LandingPage
