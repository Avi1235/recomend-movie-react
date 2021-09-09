import React, { useState, useEffect } from 'react';

export const RecomendList = props => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [listRecomendations, setListRecomendations] = useState([]);

    const [typingTimeout, setTypingTimeout] = useState(0);

    useEffect(  ()  =>  {
        console.log('entre');
        if (typingTimeout) {
            clearTimeout(typingTimeout);
         }
        var id = JSON.parse(localStorage.getItem('vistas_recientes')).imdbId;
        setTypingTimeout(setTimeout(async function () {
        fetch("http://localhost:5000/api/recomendations/" + id)
          .then(async res => await res.json())
          .then(
              (result)  => {
              setIsLoaded(true);
              setListRecomendations(result);
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
        }, 200))
          return ([]);
      }, [])

    return (
        
        <div className="container" style={{ paddingTop: "24px", paddingBottom: "24px"}} >
            <div className="row" style={{margin:"auto"}}>
            {
                listRecomendations.map(topmovie => (
                    <div className="pelicula-item" key={topmovie.imdbId}>
                        <div to={{ pathname: "/title/" + topmovie.imdbId, movie: topmovie }}>
                            <div className="card">
                                <img src={topmovie.img} alt={topmovie.title} className="card-img-top" style={{ height: "275px", width: "186px" }} />
                                <div className="card-body text-white" style={{ height: "100px", width: "186px" }}>
                                    <h6 style={{ marginBottom: 0 }}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{ height: 18, marginRight: 6 }} />{topmovie.rating}</h6>
                                    <h6>{topmovie.title.length > 45 ? topmovie.title.slice(0, 40) + '...' : topmovie.title} </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
}