import "./App.css";

import Home from "./pages/home/Home";
import MovieList from "./components/movieList/Movielist";
import Movie from "./pages/moviedetail/MovieDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
