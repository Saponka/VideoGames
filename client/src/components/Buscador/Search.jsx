import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getName } from '../../redux/actions/index'



export default function Search(/* {setPaginaActual} */){

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    //const allVideogames = useSelector((state) => state.allVideogames);


    function handleImputChange(e){
      e.preventDefault()
      setName(e.target.value)
      console.log(e.target.value);
    }

    function handleSubmit(e){
      e.preventDefault();
      
       name
      ? dispatch(getName(name))
      : alert('Por favor coloca el nombre de un VideoGame para buscar')
      setName('') 
      //setPaginaActual(1)
    }
   

  return (    
    <div>
      <form onSubmit={handleSubmit} /*  */>
        <input
        id="name"
        autoComplete='off'
        type='text'
        value={name}
        placeholder='Ingrese el nombre'
        onChange={(e)=>handleImputChange(e)}
        />
        <button type="submit" onClick={() => setName("")}>Buscar</button>
      </form>

    </div> 
  )
}