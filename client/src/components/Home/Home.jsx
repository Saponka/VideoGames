import React,{useEffect,useState}from 'react';
//componentes
import Nav from '../Buscador/Nav';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import Paginado from '../Paginacion/Paginado';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getvideogame } from '../../redux/actions/index';
//css
import styles from '../Card/card.module.css';

const Home = () => {

  const dispatch = useDispatch();
  const allVideosGames = useSelector((state)=>state.allVideogames);

  useEffect(()=>{
    dispatch(getvideogame())
  },[dispatch]);

   //paginado
   const [page, setPage] = useState(1); // primera pag.
   const gamesPorPage = 15;// 15 juegos x pagina

   const lastGame = page * gamesPorPage; // 1 * 15 = 15
   const firstGame = lastGame - gamesPorPage; // 15 - 15 = 0

   const currentGames = allVideosGames.slice(firstGame, lastGame); //dividir los juegos x pagina
   const paginado = (pageNumber) => { //establece el numero de pagina
    setPage(pageNumber);
  
}

  return (
    <div>
      <Nav setPage={setPage} />
      <Paginado gamesPorPage={gamesPorPage} allVideosGames={allVideosGames.length} paginado={paginado} page={page} />
      <div>
      <div className={styles.div}>
         {currentGames.length > 0
          ? currentGames?.map((vg,id) => {
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
                  currentGames={currentGames}
                />
              );
            })
          : <Loading/>}  
      </div>
     
      </div>
      <Paginado gamesPorPage={gamesPorPage} allVideosGames={allVideosGames.length} paginado={paginado} page={page} />
    </div>
  )
}

export default Home;
