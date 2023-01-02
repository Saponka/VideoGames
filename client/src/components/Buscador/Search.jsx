import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getName } from '../../redux/actions/index';



export default function Search(){

    const dispatch = useDispatch();
    let history = useHistory();
    const [name, setName] = useState('');
    const videogames = useSelector((state) => state.allVideogames);


    function handleInputChange(e){
      e.preventDefault()
      setName(e.target.value)
      console.log(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      
        let match = videogames.filter((p)=> p.name); 

       if(match){
       dispatch(getName(match.name));
       history.push(`/videogames/${match.name}`)
        setName('');
       }else{
        alert('Por favor coloca el nombre de un VideoGame para buscar')
        setName('');
       
       }
      // name ? dispatch(getName(name)):alert('Por favor coloca el nombre de un VideoGame para buscar')
      //setName('') 
      //setPaginaActual(1)
      console.log(match.name);
    }
   

  return (    
    <div>
      <form onSubmit={handleSubmit} /*  */>
        <input 
        type='text'
        value={name}
        placeholder='Ingrese el nombre'
        onChange={handleInputChange}
        
        />
        <button type="submit" onClick={() => setName("")}>Buscar</button>
      </form>

    </div> 
  )
}