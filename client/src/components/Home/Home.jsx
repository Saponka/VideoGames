import React,{useEffect}from 'react';
import Nav from '../Buscador/Nav';
import Card from '../Card/Card';
import '../Card/card.css';
 //redux
import { useDispatch, useSelector } from 'react-redux';
import { getvideogame } from '../../redux/actions/index';

const Home = () => {
    const dispatch = useDispatch();
  const allVideos = useSelector((state)=>state.allVideogames);

  useEffect(()=>{
    dispatch(getvideogame())
  },[dispatch])
   
  return (
    <div style={{ background: "linear-gradient(to right, #1F1C18, #8E0E00)"}}>
      <Nav/>
      <div>
        <h1>VideoGames Dungeon</h1>
      </div>
      <div className='div'>
        {allVideos.length > 0
          ? allVideos.map((vg,id) => {
              return (
                <Card
                  key={id}
                  id={vg.id} 
                  name={vg.name}
                  image={vg.image}
                  rating={vg.rating}
                  genres={vg.genres}
                  platforms={vg.platforms}
                  description={vg.description}
                />
              );
            })
          : null} 
        <Card/> 
      </div>
    </div>
  )
}

export default Home
