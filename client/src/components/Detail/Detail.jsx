import React,{useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {getVideoGamesId,resetState} from '../../redux/actions/index'
import '../Detail/detail.css'

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
    <div id='fondo'>
          <h1 style={{color:"white"}} >{videogame.name}</h1>
          <div>
             <img
              src={videogame.image ? videogame.image : videogame.name}
              alt={`${videogame.name}'s`}
              width="480px"
              height="280px"
              style={{border: "1px solid red"}}
             />
          </div>
          <div>
             <p>⭐ {videogame.rating}</p>
             <p>{videogame.genres?.map((g) => (g.name ? g.name : g)).join(" | ")}</p>
             <p> 📅 {videogame.released}</p>
             <p> {videogame.publishers?.map((g) => (g.name ? g.name : g))}</p>
             <div style={{color:"white"}}>
                 🎮: {videogame.platforms?.join(", ")}
             </div>
          <br></br>
          <div style={{color:"white"}}>📌
             {videogame.description}</div>{/* usar regular expresions */}
          {/* /<(?!\/?a(?=>|\s?.*>))\/?.*?>/g,'' */}
          {/* .replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g)*/}
        </div>
      <br></br>
      <Link to={"/home"} onClick={() => reset()}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Detail;
