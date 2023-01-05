import React,{useEffect,useState} from 'react';
import { useParams,Link } from "react-router-dom";
//componentes
import Loading from '../Loading/Loading';
//redux
import { useSelector, useDispatch } from "react-redux";
import {getVideoGamesId,resetState} from '../../redux/actions/index';
//css
import styles from  '../Detail/detail.module.css';
import style from  '../LandingPage/landing.module.css';

const Detail = () => {


  const [carga, setCarga] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogames);
  
  const reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g             
 /*   /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g   */

 
 useEffect(() => {
   dispatch(getVideoGamesId(id)).then(() => setCarga(false))
  }, [dispatch, id]);
  
  //reset
  const reset = () => {
    dispatch(resetState());
  };

  if (carga) {
    return <Loading />;
  }

  return (

    <div id={styles.fondo}>
          <h1>{videogame.name}</h1>
          <div>
             <img
              src={videogame.image ? videogame.image : videogame.name}
              alt={`${videogame.name}'s`}
              width="480px"
              height="280px"
              style={{border:" 1px solid red"}}
             />
          </div>
          <div>
             <p>⭐ {videogame.rating}</p>
             <p>{videogame.genres?.map((g) => (g.name ? g.name : g)).join(" | ")}</p>
             <p> 📅 {videogame.released}</p>
             <div className={styles.plataforms}>
                 {videogame.platforms?.join(", ")}
             </div>
          <br></br>
          <div className={styles.div}>📌{videogame.description?.replace(reg,'')}</div>
        </div>
      <br></br>
      <Link to={"/home"} onClick={() => reset()}>
        <button className={style.btn}>Back to Home</button>
      </Link>
    </div>
  );
}

export default Detail;
