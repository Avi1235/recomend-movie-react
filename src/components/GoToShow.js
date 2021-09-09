import React, { useState, useEffect } from 'react';

export const GoToShow = props => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(  ()  =>  {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: props.location.movie.title,
                                   img: props.location.movie.img,
                                   imdbId: props.location.movie.imdbId,
                                   year: props.location.movie.year})
        };
        fetch("http://localhost:5000/api/search", requestOptions)
          .then(async res => await res.json())
          .then(
              (result)  => {
              setIsLoaded(true);
              setData(result);
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
      }, [props.location.movie])

      useEffect(() => {
        localStorage.setItem('vistas_recientes', [JSON.stringify(data)]);
      }, [data]);

      useEffect(() => {
         if (!data.find(t => t.imdbId === props.location.movie.imdbId)){
            setData([...data, { imdbId: props.location.movie.imdbId, img: props.location.movie.img, plot: data.plot, rating: data.rating, title: props.location.movie.title, year: props.location.movie.year }])
        }
      }, []);

    return (
       <div className="container" style={{width:39+"%"}}>
           <div className="card" style={{width:60+"%", display:"block", margin:"auto"}}>
           <div className="card-body text-white" >
            <h5 style={{float:"left"}} >{props.location.movie.title > 45 ? props.location.movie.title.slice(0,40)+'...':props.location.movie.title}  ({props.location.movie.year})</h5>
            <h5 style={{marginBottom:0, float:"right"}}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{height:18, marginRight:6}}/>{data.rating}</h5>
            </div>
               <div className="poster">
               <div className="plot_summary_wrapper">
               <img style={{width:100+"%"}} src={props.location.movie.img} alt={props.location.movie.title}/>
                   
                           <div> {data.plot} </div>
                   </div>
               </div>
           </div>
        </div>
    );
}