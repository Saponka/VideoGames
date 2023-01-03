 import React from 'react';
import { Link } from 'react-router-dom';
//css
import styles from '../Card/card.module.css';
                                  //props//
export default function Card({id,name,image,rating,genres}) {

  return(
        
      <div className={styles.card} >
        <Link  to={`/videogames/${id}`}>
        <h3>{name} </h3>
        </Link>
      <img className={styles.img} src={image} alt={name}  />
      <p>Rating: {rating } ⭐</p>
      <p>Genres: {genres } </p>
      </div>        
  )
}


