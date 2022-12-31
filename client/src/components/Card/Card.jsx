 import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default function Card({id,name,image,rating,genres}) {

  return(
        
      <div className='card' >
        <Link  to={`/videogames/${id}`}>
        <p>{name} </p>
        </Link>
      <img className='img' src={image} alt={name}  />
      <p>Rating: {rating } ⭐</p>
      <p>Genres: {genres } </p>
      </div>        
  )
}


