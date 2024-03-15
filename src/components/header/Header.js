import React, { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({
  onSearchTextChange,
  genreOptions,
  onGenreChange,
  onClearSearch,
  onSortChange,
  onSearchTextSubmit,
  hideSorting,
}) => {
  return (
    <div className="header">
      <div className="cstm__container">
        <div className="nav__wrapper">
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/movies/popular">Popular</Link>
            <Link to="/movies/top_rated">Top Rated</Link>
            <Link to="/movies/upcoming">Upcoming</Link>
          </div>

          <div className="search">
          <input
            placeholder="Search"
            type="text"
            onChange={(e) => {
              onSearchTextChange(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && onSearchTextSubmit();
            }}
          />
          <p onClick={onSearchTextSubmit()}></p>
          <select
            name="genres"
            id="genres"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genreOptions.map((el) => (
              <option value={el.value}>{el.label}</option>
            ))}
          </select>
          {!hideSorting && (
            <select
              name="sorting"
              id="sortinf"
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value={"asc"}>A-Z</option>
              <option value={"desc"}>Z-A</option>
            </select>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
