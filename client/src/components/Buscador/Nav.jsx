import React from "react";
import { Link,useHistory } from 'react-router-dom';
//componentes
import Search from "../Buscador/Search";
//conectar con redux
import { useDispatch } from 'react-redux';
//traer actions de redux
import {getvideogame,orderByName} from '../../redux/actions/index'
//css
import styles from  '../Buscador/nav.module.css';


const Nav = ({setPage}) => {
//state and seter
const dispatch = useDispatch();
const history = useHistory();

const handleName = (e) => {
  dispatch(orderByName(e.target.value));
  history.push("/home");
  setPage(1);
};

//reset
function reset(e) {
    dispatch(getvideogame());
    setPage(1);
  }
  
  return (
    
    <div className={styles.nav} >
             
             <Search/>
    
          <select onChange={(e) => handleName(e)}  style={{height:"fit-content"}} className={styles.btn2} >
               <option >ORDER</option>
               <option  value="asc">ORDER BY A TO Z</option>
               <option  value="desc">ORDER BY Z TO A </option>
           </select>
          {/*  <select style={{height:"fit-content"}} className={styles.btn2} >
                <option hidden >ORDER BY GENRE</option>
                <option value="action">action </option>
                <option value="rpg">rpg </option>
           </select> */}
            <Link to='/create'><button style={{height:"fit-content"}} className={styles.btn2}>Crear Juego</button></Link>  
         <button  onClick={()=> reset() } style={{height:"fit-content"}} className={styles.btn2}>Reset</button>
             <Link to='/'><button style={{height:"fit-content"}} className={styles.btn2}>Salir</button> </Link>   
   </div>
   
  )
}

export default Nav;
