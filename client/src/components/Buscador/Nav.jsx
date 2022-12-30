import React,{useState}from "react";
import '../Buscador/nav.css';
import { Link } from 'react-router-dom';
import Search from "./Search";
//conectar con redux
import { useDispatch } from 'react-redux';
//traer actions de redux
import {getvideogame} from '../../redux/actions/index'

const Nav = () => {
//state and seter
const [text, setText]= useState(" ");
/* const [games, setGames]= useState(" "); */
const dispatch = useDispatch()

function handleHome(e){
  e.preventDefault()
  //dispatch(home())
  //setPaginaActual(1);
}

/*   const handleClick= async()=>{
  const {data} = await axios.get("https://api.themoviedb.org/3/search/movie?api_key=32c20d590617f94bdbbfaad9baf89d61&query=" + text)
  setGames(data.results)
  setText("")
} */
//handleChange target input
/* function handleChange(e){
    setText(e.target.value)
    console.log(e.target.value);
} */
//handleSubmit
/* function handleSubmit(e) {
    e.preventDefault();
    //props.getByName(text);
    console.log(text);
  } */
//reset
function reset(e) {
    dispatch(getvideogame())
   setText("");
   console.log(text);
  }

  return (
    <div className="nav" style={{backgroundColor: "black"}}>
   
          <div >    
             <button><Link to='/home' onClick={handleHome}>Home</Link></button>
             <button><Link to='/create'>Crear VideoGame</Link></button>
             <button><Link to='/'>Salir</Link></button>    
          </div>
          <select >
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
