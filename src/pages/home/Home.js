import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.min.css";
import Header from "../../components/header/Header";
import Slider from "react-slick";

const Home = () => {
  const [popularMovies, setPopularmovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [movieTitleSearchText, setMovieTitleSearchText] = useState();
  const [sortBy, setSortBy] = useState("asc");
  const [hideSorting, setHideSorting] = useState(true);

  const movieSearchHandler = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=d63c4905255acec5b45ebda57ab263df${
        movieTitleSearchText?.length ? "&query=" + movieTitleSearchText : ""
      }&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!selectedGenre?.length) {
          const sortedResults = sortByOriginalTitle(data.results, sortBy);
          setSearchResults(sortedResults);
        } else {
          const newSearchResults = [];
          data.results.forEach((el) => {
            if (el.genre_ids.includes(parseInt(selectedGenre))) {
              newSearchResults.push(el);
            }
          });
          const sortedResults = sortByOriginalTitle(newSearchResults, sortBy);

          setSearchResults(() => sortedResults);
          return;
        }
      });
  };

  const movieTitleSearchChangeHandler = (movieTitle) => {
    setMovieTitleSearchText(movieTitle);
  };
  const genreChangeHandler = (genre) => {
    setSelectedGenre(genre);
  };

  const clearSearch = () => {
    setSearchResults([]);
  };

  const changeSortHandler = (sorting) => {
    setSortBy(sorting);
  };
  const sortByOriginalTitle = (movies, sortOrder) => {
    return movies.sort((a, b) => {
      const titleA = a.original_title.toUpperCase();
      const titleB = b.original_title.toUpperCase();

      if (sortOrder === "asc") {
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      } else if (sortOrder === "desc") {
        if (titleA > titleB) {
          return -1;
        }
        if (titleA < titleB) {
          return 1;
        }
        return 0;
      } else {
        return 0;
      }
    });
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d63c4905255acec5b45ebda57ab263df"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(`movieData: `, data.results);
        setPopularmovies(data.results);
      });
    getGenres();
  }, []);
  const getGenres = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=d63c4905255acec5b45ebda57ab263df&language=en`
    )
      .then((res) => res.json())
      .then((data) =>
        setGenreList(() =>
          data.genres.map((el) => ({
            label: el.name,
            value: el.id,
          }))
        )
      );
  };

  useEffect(() => {
    if (selectedGenre?.length && searchResults.length) {
      console.log(
        `yes genre: `,
        searchResults,
        `selected genre`,
        typeof selectedGenre
      );
      const newSearchResults = [];
      searchResults.forEach((el) => {
        if (el.genre_ids.includes(parseInt(selectedGenre))) {
          newSearchResults.push(el);
        } else {
          console.log(`no: `, typeof el.genre_ids[0]);
        }
      });

      setSearchResults(() => newSearchResults);
      console.log(`yes genr 2222e: `, newSearchResults);
    }
  }, [selectedGenre]);

  useEffect(() => {
    movieSearchHandler();
  }, [sortBy]);

  useEffect(() => {
    setHideSorting(searchResults?.length ? false : true);
  }, [searchResults]);

  return (
    <>
      <Header
        onSearchTextChange={movieTitleSearchChangeHandler}
        onSearchTextSubmit={movieSearchHandler}
        genreOptions={genreList}
        onGenreChange={genreChangeHandler}
        onClearSearch={clearSearch}
        onSortChange={changeSortHandler}
        hideSorting={hideSorting}
      />
      <div className="">
        <Slider
          fade={true}
          autoplay={true}
          autoplaySpeed={3000}
          pauseOnHover={true}
        >
        {searchResults.length
          ? searchResults.map((movie) => (
            <div className="movie__card" key={movie.id}>
              <div className="card__container" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movie && movie.backdrop_path})`}}>
                <div className="cstm__container">
                  <div className="flex__box">
                    <div className="flex__item">
                      <Link to={`/movie/${movie.id}`}>
                        <div className="image__container">
                          <img
                          src={`https://image.tmdb.org/t/p/original${
                            movie && movie.poster_path
                          }`}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="flex__item">
                      <div className="text__container">
                        <div>
                          Release: {movie ? movie.release_date : ""}
                        </div>
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
                        <div className="co_btn">
                          <Link to={`/movie/${movie.id}`}>View Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overlay">
                </div>
              </div>
            </div>
            ))
          : popularMovies.map((movie) => (

              <div className="movie__card" key={movie.id}>
                <div className="card__container" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movie && movie.backdrop_path})`}}>
                  <div className="cstm__container">
                    <div className="flex__box">
                      <div className="flex__item">
                        <Link to={`/movie/${movie.id}`}>
                          <div className="image__container">
                            <img
                            src={`https://image.tmdb.org/t/p/original${
                              movie && movie.poster_path
                            }`}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="flex__item">
                        <div className="text__container">
                          <div>
                            Release: {movie ? movie.release_date : ""}
                          </div>
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
                          <div className="co_btn">
                            <Link to={`/movie/${movie.id}`}>View Details</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overlay">
                  </div>
                </div>
              </div>

            ))}
        </Slider>
      </div>
    </>
  );
};

export default Home;
