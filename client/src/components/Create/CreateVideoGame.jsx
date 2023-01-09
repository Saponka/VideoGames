import React, { useEffect, useState } from 'react';
import { Link,useHistory} from "react-router-dom";
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getByGenres,createVideogame} from '../../redux/actions';
//css
import styles from '../Create/form.module.css';
import style from '../LandingPage/landing.module.css';

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
      platforms: [], 
    });
  
    const [error, setErrors] = useState({}); //me creo un estado local, en donde error = {}
    
    //handler states
    const dispatch = useDispatch();
    //selector
    const generos = useSelector((state) => state.genres);
    const allGames = useSelector(state => state.allVideogames);
    const history = useHistory();
    
  //effect
    useEffect(() => {
      dispatch(getByGenres());
      
    }, [dispatch]);

    ///handlers
    function handleChange(e) {
      e.preventDefault();
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      setErrors(validate({ ...input, [e.target.name]: e.target.value}))
    }
  
   function handleGenres(e) {
    if(!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  } 
    ///////////////
  const plataformas =[
    'Android',
    'iOS',
    'Linux',
    'macOS',
    'Nintendo Switch',
    'PC',
    'PlayStation 3',
    'PlayStation 4',
    'PlayStation 5',
    'PS Vita',
    'Web',
    'Xbox 360',
    'Xbox One',
    'Xbox Series S/X',
    'Xbox',
  ]

  const handlePlatform =(e)=>{
    let array = input.platforms
    array.push(e.target.value)
    setInput({
      ...input,
      plataformas:array
    })
    const validations = validate(input);
    setErrors(validations)
     }
    //////////////////

    function handleSubmit(e) {
      e.preventDefault();
      if(!error.name){
       if(allGames.find((n) => n.name === input.name)){
        alert('El nombre del juego ya existe');
        setInput({});
        history.push('/home')
       }
       dispatch(createVideogame(input));
       setInput({});
       alert("Juego creado exitosamente.");
       history.push('/home')

      }else if (error.name){
        alert('Llene los campos correctamente');
        setInput({});
      }
    }  
    
    return (
      <div id={styles.fondo}>
        <form onSubmit={(e) => handleSubmit(e)}  className={styles.form} >
            <h2>CREA TU PROPIO VIDEOJUEGO</h2>
  
              <label>Nombre</label>
              <input
                className={error.name && styles.danger}
                type="text"
                required
                name="name"
                value={input.name}
                placeholder="Nombre..."
                onChange={(e) => handleChange(e)}
                /> 
              {error.name ? <span className={styles.error}>{error.name}</span>: null}
    
              <label >Imagen</label>
              <input
                id={styles.urlInputSize}
                className={error.image && styles.danger}
                type="text"
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
                placeholder='URL...'
                /> 
              {error.image ? <span className={styles.error}>{error.image}</span>:null}
            
              <label>Fecha de lanzamiento</label>
              <input
                className={error.released && styles.danger} 
                required
                type='date'
                name="released"
                value={input.released}
                placeholder='yyyy-mm-dd'
                onChange={(e) => handleChange(e)}
                /> 
              {error.released ?<span className={styles.error}>{error.released}</span>:null }
            
              <label>Rating</label>
              <input
                className={styles.ratingInput} 
                required
                type="number"
                name="rating"
                value={input.rating}
                onChange={(e) => handleChange(e)}
                /> 
              {error.rating ?<span className={styles.error}>{error.rating}</span>: null}
            
              <label>Genero</label>
              <select  id="genres" defaultValue="" onChange={(e) => handleGenres(e)}>
                <option  value='' hidden>género...</option>
                {  generos?.map((g) => {
                  return (
                    <option key={g.id} value={g.name}>{g.name}</option>
                    );
                  })}
              </select> 
              
              <label>Plataformas</label>
              {/* tipo check box */}
              <div className={styles.containerPlat}>
              {plataformas.map((p,id)=> {
            return(
              <div key={id} >
                <ul>
                  <li>
              <input
                            
              type='checkbox'
              id={p}
              name={p}
              value={ p }
              disabled ={input.platforms.length > 4 && !input.platforms.includes(p)} 
              selected={ input.platforms.includes(p) } onChange={ handlePlatform }
              />
              <label id={p} >{p}</label>
              </li>
              </ul>
              </div>
              )})
            }
            </div> 
            {/* tipo select */}
             {/*  <select defaultValue=""  onChange={ handlePlatform } >
                    <option value="" disabled hidden>plataforma...</option>
                    {  plataformas?.map((p,id) => {
                  return (
                    <option key={id} value={p}>{p}</option>
                    );
                  })}
              </select>  */}
              <br/>
              <label>Descripcion</label>
              <textarea
               className={error.description && styles.danger}
                required
                type="text"
                rows={15}
                cols={45}
                name="description"
                value={input.description}
                onChange={(e) => handleChange(e)}
                > 
              </textarea>
              {error.description ?<span className={styles.error}>{error.description}</span>:null}
            
            <br></br>
            <button className={style.btn} type="submit">CREAR VIDEOGAME</button>
            <br></br>
            <Link to={'/home'}><button className={style.btn}>Volver</button> </Link>
        
        </form>
  
      </div>
    );
  }
