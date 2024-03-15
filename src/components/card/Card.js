import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.min.css";

const Card = ({movie}) => {
  return (
    <div className="movie__list__card" key={movie.id}>
      <div className="card__container">
        <Link to={`/movie/${movie.id}`}>
          <div className="image__container">
          <img src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} />
          </div>

          <div className="text__container">
            <div>
              <h1><Link to={`/movie/${movie.id}`}>{movie ? movie.original_title : ""}</Link></h1>
            </div>
            <div className="ratings">
              <li>
                <span class="material-icons">
                star
                </span>
                {movie ? movie.vote_average : ""}
              </li>
              <li>
                <span class="material-icons">
                person
                </span>
                {movie ? movie.vote_count : ""}
              </li>
            </div>
            <div>
              {movie ? movie.overview : ""}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Card;
