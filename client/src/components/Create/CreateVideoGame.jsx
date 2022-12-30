import React, { useEffect, useState } from 'react'

//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getByGenres,createVideogame,getvideogame} from '../../redux/actions'
import { NavLink} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import './form.css';

function validate(input){
  const errors = {}
  if(!input.name) errors.name = "El nombre es requerido";
  if(!input.description) errors.description = "La descripción es requerida";
  if(!input.released) errors.released = "La fecha de lanzamiento es requerida";
  if(!input.rating || input.rating < 0 || input.rating > 5) errors.rating = "El rating es requerido y no puede ser negativo ni mayor a 5 ";
  if(!input.platform) errors.platform = "Por favor selecciona 1 plataforma";
  if(!input.genres ) errors.genres = "Por favor selecciona 1 genero";
  return errors;
}

export default function CreateVideoGame() {
   //States
    const [input, setInput] = useState({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: []
    });
  
    const [error, setErrors] = useState({}); //me creo un estado local, en donde error = {}
    
    //handler states
    const dispatch = useDispatch();
    const generos = useSelector((state) => state.genres);
    const allGames = useSelector(state => state.allVideogames)
    const history = useHistory();
    //const plataformas = useSelector(state => state.platforms);
  
    useEffect(() => {
      dispatch(getByGenres());
      dispatch(getvideogame())
    }, [dispatch]);

          //////
    function handleChange(e) {
      e.preventDefault();
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors(validate({ ...input, [e.target.name]: e.target.value}))
    }
       //////////////
    function handleGenres(e) {
       const {value} = e.target;
        setInput({...input,
          genres:value})
      
    }
    function handleSubmit(e) {
      e.preventDefault();
      if(!error.name){
       if(allGames.find((n) => n.name === input.name)){
        alert('El nombre del juego ya existe');
        setInput({});
        history.push('/home')
       }
       dispatch(createVideogame(input));
       setInput({
         name: "",
         image: "",
         description: "",
         released: "",
         rating: "",
         genres: [],
         platforms: [],
       });
       alert("Juego creado exitosamente.");
       history.push('/home')

      }else if (error.name){
        alert('Llene los campos correctamente');
        setInput({})
      }
    } 
  
 
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)} >
          
            <h2 >CREA TU PROPIO VIDEOJUEGO</h2>
  
            <div >
              <label>Name</label>
              <input
               className={error.name && "danger"}
                type="text"
                required
                name="name"
                value={input.name}
                placeholder="Name"
                onChange={(e) => handleChange(e)}
                /> 
              {error.name ? <span className='span'>{error.name}</span>: null}
            </div>
  
  
            <div>
              <label >Imagen: </label>
              <input
              className={error.image && "danger"}
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
                placeholder='URL...'
                /> 
              {error.image ? <span className='span'>{error.image}</span>:null}
            </div>
  
           <div>
            <label>Fecha de lanzamiento: </label>
              <input
                className={error.released && 'danger'} 
                required
                type='date'
                name="released"
                value={input.released}
                placeholder='yyyy-mm-dd'
                onChange={(e) => handleChange(e)}
                /> 
              {error.released ?<span className='span'>{error.released}</span>:null }
            </div>
  
            <div >
              <label>Rating: </label>
              <input
              /* className={} */
                required
                type="number"
                name="rating"
                value={input.rating}
                onChange={(e) => handleChange(e)}
                /> 
              {error.rating ?<span className='span'>{error.rating}</span>: null}
            </div>
  
  
            <div>
                <label>Generos: </label>
              <select  id="genres" defaultValue="" onChange={(e) => handleGenres(e)}>
                <option  value='' disabled hidden>géneros...</option>
                {  generos.map((g,id) => {
                  return (
                    <option key={id} value={g.name}>{g.name}</option>
                    );
                  })}
              </select> 
            </div>
  
  
            <div >
                    <label>Plataformas:  </label>
                <select  id="platforms" defaultValue="" >
                    <option value="" disabled hidden>plataformas...</option>
                    
                      return (
                        <option>'PC'</option>
                       
                </select> 
             {/*    {input.platforms.map((p) => (
                  <div >
                    <div >{p}</div>
                    <button className={s.btn_remove} onClick={() => handleDeleteP(p)} key={p} value={p}><span >X</span></button> 
                  </div>
                ))} */}
            </div>
  
            <div >
              <label>Descripcion: </label>
              <textarea
              className={error.description && 'danger'}
                required
                type="text"
                name="description"
                value={input.description}
                onChange={(e) => handleChange(e)}
                > 
                </textarea>
              {error.description ?<span className='span'>{error.description}</span>:null}
            </div>
       
        <div>
            <button type="submit">CREAR VIDEOGAME</button>
        </div>
        <div>
            <NavLink to={'/home'}>Volver</NavLink>
        </div>
        </form>
  
      </div>
    );
  }
