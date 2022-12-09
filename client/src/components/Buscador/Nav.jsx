import React,{useState}from "react";
//conectar con redux
//import { connect } from "react-redux";
//traer actions de redux
//import {getByName,getAll} from '../../redux/actions/index'


//state and seter
const [text, setText]= useState(" ");
//handleChange target input
function handleChange(e){
    setText(e.target.value)
}
//handleSubmit
function handleSubmit(e) {
    e.preventDefault();
    //props.getByName(text);
    console.log(text);
  }
//reset
function reset(e) {
    //props.getAll();
    setText("");
  }

const Nav = () => {
  return (
    <div>
      <form onSubmit={handleSubmit} >
      <input type="text" value={text} onChange={handleChange}/>
      <input type="submit" value="Buscar" />
      </form>
      <div>
         <button  onClick={()=> reset()/* props.getAll() */}>Reset</button>
      </div>
   </div>
  )
}

export default Nav
