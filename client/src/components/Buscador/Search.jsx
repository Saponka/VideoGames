import React, { useState } from 'react';
//import { useHistory } from "react-router-dom";
//redux
import { useDispatch} from 'react-redux';
import { getName } from '../../redux/actions/index';
import styles from '../Buscador/nav.module.css';


export default function Search(){

    const dispatch = useDispatch();
    
    const [name, setName] = useState('');

    function handleInputChange(e){
      e.preventDefault()
      setName(e.target.value)
      console.log(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();

       if(name){
       dispatch(getName(name));
        setName('');
       }else{
        alert('Por favor coloca el nombre de un VideoGame para buscar')
        setName('');
       
       }
      console.log(name);
    }
   
  return (    
    <div>
      <form onSubmit={handleSubmit} >
        <input 
        type='text'
        value={name}
        placeholder='Ingrese el nombre'
        onChange={handleInputChange}
        className={styles.btn2}
        />
        <button className={styles.btn2} type="submit" >Buscar</button>
      </form>
    </div> 
  )
}