import React,{useEffect} from "react";
import { Link, useHistory } from 'react-router-dom';
//componentes
import Search from "../Buscador/Search";
//redux
import { useDispatch, useSelector } from 'react-redux';
//traer actions de redux
import {getvideogame,orderByName,ordenRating,filterAll,filtroGenres,getByGenres} from '../../redux/actions/index'
//css
import styles from  '../Buscador/nav.module.css';


const Nav = ({setPage}) => {
  //state and seter
 //const [option, setOption] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const generos = useSelector( (state) => state.genres)
  //efecct
   useEffect(() => { //
    dispatch(getByGenres())
 
  }, [dispatch])
  //handlers
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
  //filters
  function handleSource(e) {
    e.preventDefault();
      dispatch(filterAll(e.target.value));
      setPage(1);
  }
 //
 function handleFilter(e) {
  e.preventDefault()
  if(e.target.value === '') {
      dispatch(getvideogame())
  } else {
      dispatch(filtroGenres(e.target.value))
      setPage(1)
  }
}

  //reset
  function reset(e) {
    dispatch(getvideogame());
    setPage(1);
  }

  return (
    <div className={styles.nav}>
      <Search />
      
      <div className={styles.order}>
        <select onChange={(e) => handleName(e)} className={styles.btn2}>
          <option>ORDER A-Z</option>
          <option value="asc">BY A TO Z</option>
          <option value="desc"> BY Z TO A </option>
        </select>
        <select onChange={(e) => handleRating(e)} className={styles.btn2}>
          <option>ORDER Rating</option>
          <option value="Min">Min Rating</option>
          <option value="Max">Max Rating</option>
        </select>
      </div>
      <div className={styles.filter}>
      <select id="genre" onChange={(e)=> handleFilter(e)} className={styles.btn2} style={{fontSize: "11px"}}  >
          <option value=''>Generos</option>
             { generos.map(g => {
              return (
                      <option key={g.id} value={g.name}>{g.name}</option>
                      )
              })
            } 
        </select>
        <select onChange={(e) => handleSource(e)} className={styles.btn2}>  
          <option value="all" >Filtrar</option>
          <option value="api">API</option>
          <option value="db">Database</option>
        </select>
        
      </div>
      <Link to="/create">
        <button className={styles.btn2}>Crear Juego</button>
      </Link>
      <button onClick={() => reset()} className={styles.btn2}>
        Reset
      </button>
      <Link to="/">
        <button className={styles.btn2}>Salir</button>{" "}
      </Link>
    </div>
  );
}

export default Nav;
