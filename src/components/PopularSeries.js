import React, { } from 'react';
import { Link } from 'react-router-dom';

export const PopularSeries = props => {
    return (
        <div className="pelicula-item"  key={props.popularserie.imdbId}>
            <Link  to={{pathname:"/title/"+props.popularserie.imdbId, movie:props.popularserie}}>
            <div className="card">
                <img src={props.popularserie.img} alt={props.popularserie.title} className="card-img-top" style={{ height: "275px", width: "186px" }} />
                <div className="card-body text-white" style={{ height: "100px", width: "186px" }}>
                <h6 style={{marginBottom:0}}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{height:18, marginRight:6}}/>{props.popularserie.rating}</h6>
                <h6>{props.popularserie.title.length > 45 ? props.popularserie.title.slice(0,40)+'...':props.popularserie.title}  ({props.popularserie.year})</h6>
                </div>
            </div>
            </Link>
        </div>
    );
}