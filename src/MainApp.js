import React, { useState, useEffect } from "react";

import { TopMovies } from "./components/TopMovies";
import { TopSeries } from "./components/TopSeries";
import { PopularMovies } from "./components/PopularMovies";
import { PopularSeries } from "./components/PopularSeries";

const tipovalue = [0,0,0,0]

export const MainApp = props => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [topmovies, setTopMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);

    const [typingTimeout, setTypingTimeout] = useState(0)
  
    const handleOnClick = function(tipo , dir)  {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
     }
      console.log("http://localhost:5000/api/" + tipo + dir);
      setTypingTimeout(setTimeout(async function () {
      await fetch("http://localhost:5000/api/" + tipo + dir)
        .then( res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            switch (tipo) {
              case 'topmovies/':
                setTopMovies(result);
                break;
              case 'topseries/':
                setTopSeries(result);
                break;
              case 'popularmovies/':
                setPopularMovies(result);
                break;
              case 'popularseries/':
                setPopularSeries(result);
                break;
              default:
                console.log('default')
                break;
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error.message);
          }
        )
      }, 1000))
    } 
   
    
  
    useEffect(  ()  =>  {
      let isSubscribed = true;
      fetch("http://localhost:5000/api/topmovies/0")
        .then(async res => await res.json())
        .then(
           (result)  => {
            if (isSubscribed) {
            setIsLoaded(true);
            setTopMovies(result);
          }},
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error.message);
          }
        )
        return () => isSubscribed = false
    }, [])
  
    useEffect(() => {
      let isSubscribed = true;
      fetch("http://localhost:5000/api/topseries/0")
        .then(async res => await res.json())
        .then(
          (result) => {
            if (isSubscribed) {
            setIsLoaded(true);
            setTopSeries(result);
          }},
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error.message);
          }
        )
        return () => isSubscribed = false
    }, [])
  
    useEffect( () => {
      let isSubscribed = true;
      fetch("http://localhost:5000/api/popularmovies/0")
        .then(async res => await res.json())
        .then(
          (result) => {
            if (isSubscribed) {
            setIsLoaded(true);
            setPopularMovies(result);
          }},
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error.message);
          }
        )
        return () => isSubscribed = false
    }, [])
  
    useEffect( () => {
      let isSubscribed = true;
      fetch("http://localhost:5000/api/popularseries/0")
        .then(async res => await res.json())
        .then(
          (result) => {
            if (isSubscribed) {
            setIsLoaded(true);
            setPopularSeries(result);
          }},
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
            console.log(error.message);
          }
        )

        return () => isSubscribed = false
    }, [])
  
  
  
    return (
      <div className="ExplorarpageReactiView">
        <div className="container" style={{ paddingTop: "24px", paddingBottom: "24px" }} >
          <section className="recently-viewed">
            <div className="Titulo-seccion">
              <h5>Top Mejores Peliculas</h5>
            </div>
            <div className="ipc-row">
                <div className="flechas flecha-izquierda" onClick={() => handleOnClick('topmovies/',tipovalue[0]=tipovalue[0]-5)}>
                  <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z">
                      </path>
                    </svg>
                </div>
                <div className="grid-peliculas">
                      {
                        topmovies.map(topmovie => (
                          <TopMovies topmovie={topmovie} key={topmovie.imdbId} />
                        ))
                      }
                    </div>
              <div className="flechas flecha-derecha" onClick={() => handleOnClick('topmovies/',tipovalue[0]=tipovalue[0]+5)}>
              <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                      </path>
                    </svg>
              </div>
            </div>
          </section>
        </div>
  
        <div className="container" style={{ paddingTop: "24px", paddingBottom: "24px" }} >
          <section className="recently-viewed"  >
            <div className="Titulo-seccion">
              <h5>Top Mejores Series</h5>
            </div>
            <div className="ipc-row">
            <div className="flechas flecha-izquierda" onClick={() => handleOnClick('topseries/',tipovalue[1]=tipovalue[1]-5)}>
                  <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z">
                      </path>
                    </svg>
                </div>
              <div className="grid-peliculas">
                {
                  topSeries.map(topserie => (
                    <TopSeries topserie={topserie} key={topserie.imdbId} />
                  ))
                }
              </div>
              <div className="flechas flecha-derecha" onClick={() => handleOnClick('topseries/',tipovalue[1]=tipovalue[1]+5)}>
              <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                      </path>
                    </svg>
              </div>
            </div>
          </section>
        </div>
  
        <div className="container" style={{ paddingTop: "24px", paddingBottom: "24px" }} >
          <section className="recently-viewed" >
            <div className="Titulo-seccion">
              <h5>Peliculas populares</h5>
            </div>
            <div className="ipc-row">
            <div className="flechas flecha-izquierda" onClick={() => handleOnClick('popularmovies/',tipovalue[2]=tipovalue[2]-5)}>
                  <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z">
                      </path>
                    </svg>
                </div>
              <div className="grid-peliculas">
                {
                  popularMovies.map(popularmovie => (
                    <PopularMovies popularmovie={popularmovie} key={popularmovie.imdbId} />
                  ))
                }
              </div>
              <div className="flechas flecha-derecha" onClick={() => handleOnClick('popularmovies/',tipovalue[2]=tipovalue[2]+5)}>
              <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                      </path>
                    </svg>
              </div>
            </div>
          </section>
        </div>
  
        <div className="container" style={{ paddingTop: "24px", paddingBottom: "24px" }} >
          <section className="recently-viewed " >
            <div className="Titulo-seccion">
              <h5>Series populares</h5>
            </div>
            <div className="ipc-row">
            <div className="flechas flecha-izquierda" onClick={() => handleOnClick('popularseries/',tipovalue[3]=tipovalue[3]-5)}>
                  <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z">
                      </path>
                    </svg>
                </div>
              <div className="grid-peliculas">
                {
                  popularSeries.map(popularserie => (
                    <PopularSeries popularserie={popularserie} key={popularserie.imdbId} />
                  ))
                }
              </div>
              <div className="flechas flecha-derecha" onClick={() => handleOnClick('popularseries/',tipovalue[3]=tipovalue[3]+5)}>
              <svg className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" style={{height:24, width:24}}>
                    <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z">
                      </path>
                    </svg>
              </div>
            </div>
          </section>
        </div>
            </div>
    );
}