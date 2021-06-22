import "./App.css";
import Movies from "./components/movies";
import React, { useState } from "react";
import { getMovies } from "./services/fakeMovieService";

function App() {
  const moviesPerPage = 5;
  const [currentPage, setPage] = useState(1);
  const [genre, setGenre] = useState("all");
  const [sortPath, setSort] = useState({ path: undefined, order: "asc" });

  const handleChange = (event, value) => {
    console.log("Page Changed", value);
    setPage(value);
  };

  const [movies, setMovies] = React.useState(
    getMovies().map((movie) => ({
      ...movie,
      id: movie._id,
      genreName: movie.genre.name,
    }))
  );

  const handleDelete = (movieID) => {
    console.log(movieID);
    setMovies(movies.filter((m) => m._id !== movieID));
  };

  const handleGenre = (genre) => {
    setGenre(genre);
    setPage(1);
  };

  const handleSort = (path, order) => {
    console.log("current order:", order);
    let sortColumn = { path, order };
    if (sortPath.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    }
    console.log(sortColumn);
    setSort(sortColumn);
  };

  return (
    <div className="App">
      <Movies
        movieList={movies}
        sortColumn={sortPath}
        currentPage={currentPage}
        pageSize={moviesPerPage}
        genre={genre}
        onChange={handleChange}
        onDelete={handleDelete}
        onGenreChange={handleGenre}
        onSort={handleSort}
      />
    </div>
  );
}

export default App;
