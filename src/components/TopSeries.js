import React, { } from 'react';
import { Link } from 'react-router-dom';

export const TopSeries = props => {
    return (    
        <div className="pelicula-item" key={props.topserie.imdbId} >
            <Link  to={{pathname:"/title/"+props.topserie.imdbId, movie:props.topserie}}>
            <div className="card">
                <img src={props.topserie.img} alt={props.topserie.title} className="card-img-top" style={{ height: "275px", width: "186px" }} />
                <div className="card-body text-white" style={{ height: "100px", width: "186px" }}>
                <h6 style={{marginBottom:0}}><img src={process.env.PUBLIC_URL + '/Gold_Star.png'} style={{height:18, marginRight:6}}/>{props.topserie.rating}</h6>
                    <h6>{props.topserie.title.length > 45 ? props.topserie.title.slice(0,40)+'...':props.topserie.title}  ({props.topserie.year})</h6>
                </div>
            </div>
            </Link>
        </div>
    );
}