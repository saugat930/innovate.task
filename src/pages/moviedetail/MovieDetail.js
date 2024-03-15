import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import "./Movie.min.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d63c4905255acec5b45ebda57ab263df`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
      <>
      <div className="movie__card">
        <div className="card__container" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${currentMovieDetail && currentMovieDetail.backdrop_path})`}}>
          <div className="cstm__container" id="single">
            <div className="back__btn">
              <Link to={-1}>
                <span class="material-icons">
                reply
                </span>Back
              </Link>
            </div>
            <div className="flex__box">
              <div className="flex__item">
                  <div className="image__container">
                    <img
                    src={`https://image.tmdb.org/t/p/original${
                      currentMovieDetail && currentMovieDetail.poster_path
                    }`}
                    />
                  </div>
              </div>
              <div className="flex__item">
                <div className="text__container">
                  <div>
                    Release: {currentMovieDetail ? currentMovieDetail.release_date : ""}
                  </div>
                  <div>
                    <h1>{currentMovieDetail ? currentMovieDetail.original_title : ""}</h1>
                  </div>
                  <div className="ratings">
                    <li>
                      <span class="material-icons">
                      star
                      </span>
                      {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                    </li>
                    <li>
                      <span class="material-icons">
                      person
                      </span>
                      {currentMovieDetail ? currentMovieDetail.vote_count : ""}
                    </li>
                  </div>
                  <div>
                    {currentMovieDetail ? currentMovieDetail.overview : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay">
          </div>
        </div>
        <div className="cstm__container" id="detail_page_container">
        <h1>Additional Details</h1>
        <div class="project-content">
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Original Language
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="content-section">
                {currentMovieDetail ? currentMovieDetail.original_language : ""}
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Runtime
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="content-section">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Genre
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="content-section">
              {
                currentMovieDetail && currentMovieDetail.genres
                ?
                currentMovieDetail.genres.map(genre => (
                  <><li className="movie__genre" id={genre.id}>{genre.name}</li></>
                ))
                :
                ""
              }
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Synopsis
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="content-section">
              {currentMovieDetail ? currentMovieDetail.overview : ""}
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Useful Links
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="content-section">
              {
                currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
              }
              {
                currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
              }
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="block-item">
              <div class="title-section">
                <h2>
                  Production companies
                </h2>
              </div>
            </div>
            <div class="block-item">
              <div class="corp__container">
              {
                currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                  <>
                  {
                    company.logo_path
                    &&
                    <div className="image__container">
                      <img className="corp_logo" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                    </div>
                  }
                  </>
                ))
              }
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </>
    )
}

export default Movie
