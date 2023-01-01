import React,{useState}from "react";
import '../Buscador/nav.css';
import { Link,useHistory } from 'react-router-dom';
import Search from "./Search";
//conectar con redux
import { useDispatch } from 'react-redux';
//traer actions de redux
import {getvideogame,orderByName} from '../../redux/actions/index'

const Nav = () => {
//state and seter
//const [text, setText]= useState(" ");
const dispatch = useDispatch();
const history = useHistory();

const handleName = (e) => {
  dispatch(orderByName(e.target.value));
  history.push("/home");
  //setPage(1);
};

///////
/* function handleHome(e){
  e.preventDefault()
  //dispatch(home())
  //setPaginaActual(1);
} */

//reset
function reset(e) {
    dispatch(getvideogame())
   //setText("");
   
  }

  return (
    <div className="nav" style={{backgroundColor: "black"}}>
   
          <div >    
             <button><Link to='/create'>Crear VideoGame</Link></button>
             <button><Link to='/'>Salir</Link></button>    
          </div>
          <select onChange={(e) => handleName(e)}  >
               <option hidden>ORDER</option>
               <option value="asc">ORDER BY A TO Z</option>
               <option value="desc">ORDER BY Z TO A </option>
           </select>
           <select >
                <option hidden>ORDER BY GENRE</option>
                <option value="action">action </option>
                <option value="rpg">rpg </option>
                <option value="metroidvania">metroidvania </option>
           </select>
         <button  onClick={()=> reset()/* props.getAll() */}>Reset</button>
          <Search/>
      
   </div>
  )
}

export default Nav
