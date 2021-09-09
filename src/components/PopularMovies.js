import React, { } from 'react';
import { Link } from 'react-router-dom';

export const PopularMovies = props => {
    return (
        <div className="pelicula-item" key={props.popularmovie.imdbId}>
            <Link to={{pathname:"/title/"+props.popularmovie.imdbId, movie:props.popularmovie}}>
            <div className="card">
                <img src={props.popularmovie.img} alt={props.popularmovie.title} className="card-img-top" style={{ height: "275px", width: "186px" }} />
                <div className="card-body text-white" style={{ height: "100px", width: "186px" }}>
                <h6 style={{marginBottom:0}}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{height:18, marginRight:6}}/>{props.popularmovie.rating}</h6>
                <h6>{props.popularmovie.title.length > 45 ? props.popularmovie.title.slice(0,40)+'...':props.popularmovie.title}  ({props.popularmovie.year})</h6>
                </div>
            </div>
            </Link>
        </div>
    );
}