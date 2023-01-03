import React,{useEffect} from 'react';
import { useParams,Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import {getVideoGamesId,resetState} from '../../redux/actions/index';
//css
import styles from  '../Detail/detail.module.css';
import style from  '../LandingPage/landing.module.css';

const Detail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogames);
  
  const reset = () => {
    dispatch(resetState());
  };

  useEffect(() => {
    dispatch(getVideoGamesId(id));
  }, [dispatch, id]);

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
             <p> {videogame.publishers?.map((g) => (g.name ? g.name : g))}</p>
             <div className={styles.plataforms}>
                 {videogame.platforms?.join(", ")}
             </div>
          <br></br>
          <div className={styles.div}>📌{videogame.description}</div>{/* usar regular expresions */}
          {/* /<(?!\/?a(?=>|\s?.*>))\/?.*?>/g,'' */}
          {/* .replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g)*/}
        </div>
      <br></br>
      <Link to={"/home"} onClick={() => reset()}>
        <button className={style.btn}>Back to Home</button>
      </Link>
    </div>
  );
}

export default Detail;
