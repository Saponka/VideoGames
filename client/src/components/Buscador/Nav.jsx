import React from "react";
import { Link, useHistory } from 'react-router-dom';
//componentes
import Search from "../Buscador/Search";
//conectar con redux
import { useDispatch } from 'react-redux';
//traer actions de redux
import {getvideogame,orderByName,ordenRating} from '../../redux/actions/index'
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
const handleRating = (e) => {
  
  dispatch(ordenRating(e.target.value));
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
             <div className={styles.order}>

          <select onChange={(e) => handleName(e)}  className={styles.btn2} >
               <option>ORDER A-Z</option>
               <option value="asc">BY A TO Z</option>
               <option value="desc"> BY Z TO A </option>
           </select>
            <select onChange={(e) => handleRating(e)}  className={styles.btn2} >
                <option>ORDER Rating</option>
                <option value="Min">Min Rating</option>
               <option value="Max">Max Rating</option>
           </select> 
             </div>
            <Link to='/create'><button  className={styles.btn2}>Crear Juego</button></Link>  
         <button  onClick={()=> reset() }  className={styles.btn2}>Reset</button>
             <Link to='/'><button  className={styles.btn2}>Salir</button> </Link>   
   </div>
   
  )
}

export default Nav;
