import React, { } from 'react';
import { Link } from 'react-router-dom';

export const TopMovies = props => {
    return (
       <div className="pelicula-item" key={props.topmovie.imdbId}>
        <Link  to={{pathname:"/title/"+props.topmovie.imdbId, movie:props.topmovie}}>
        <div className="card">
            <img src={props.topmovie.img} alt={props.topmovie.title} className="card-img-top" style={{ height: "275px", width: "186px" }} />
            <div className="card-body text-white" style={{height: "100px", width: "186px"}}>
            <h6 style={{marginBottom:0}}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{height:18, marginRight:6}}/>{props.topmovie.rating}</h6>
                <h6>{props.topmovie.title.length > 45 ? props.topmovie.title.slice(0,40)+'...':props.topmovie.title}  ({props.topmovie.year})</h6>
            </div>
        </div>
        </Link>
        </div>
    );
}