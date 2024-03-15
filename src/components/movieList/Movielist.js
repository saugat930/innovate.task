import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import "./Movielist.min.css";
import { useParams } from "react-router-dom";
import Header from "../header/Header";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=d63c4905255acec5b45ebda57ab263df`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <div className="cstm__container" id="listed">
      <div className="back__btn">
        <Link to={-1}>
          <span class="material-icons">
          reply
          </span>Back
        </Link>
      </div>
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()} Movies</h2>
      <div className="movie__container">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
