import React from "react";
import styles from '../LandingPage/landing.module.css'


const Paginado = ({gamesPorPage, allVideosGames, paginado,page}) => {

    const pageNumber = [];
    const total = Math.ceil(allVideosGames/gamesPorPage);//100/15  = 6.66 = 7
    for(let i = 1; i <= total; i++) {   
        pageNumber.push(i)
    }

    return (
      <div style={{backgroundColor:"black"}} >
      <button 
      className={styles.btn} 
      onClick={page > 1 ? () => paginado(page - 1) : null}
      disabled={page === 1 ? true : false}
      >
        Prev
      </button>
      {pageNumber.length > 0 &&
        pageNumber.map((number) => { //numeros de pagina
          return (
            <button  className={styles.btn} key={number} onClick={() => paginado(number)}>
              {number}
            </button>
          );
        })}
      <button
       className={styles.btn}
        onClick={page < total ? () => paginado(page + 1) : null}
        disabled={page === total ? true : false}
      >
        Next
      </button>
    </div>
      
    )
}




export default Paginado