import React, {  } from 'react';
import { Link } from 'react-router-dom';

export const DropDown = props => {
    return (
        <li className="item-li" key={props.movie.imdbId}>
            <Link to={{pathname:"/title/"+props.movie.imdbId, movie:props.movie}} className="card p-2 myElement" onClick={e => props.searchOnClick}> 
                <div className="row" style={{margin:0}}>
                <img src={props.movie.img} style={{height:100, width:67 }}/>
                <div className="card-body text-white pl-3">
                    <h6>{props.movie.title}</h6>
                    <p>{props.movie.year}</p>
                </div>
                </div>
                </Link>
        </li>
    );
}