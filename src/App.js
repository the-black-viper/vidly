import "./App.css";
import Movies from "./components/movies";
import React, { useState } from "react";
import { getMovies } from "./services/fakeMovieService";

function App() {
  const moviesPerPage = 5;
  const [currentPage, setPage] = useState(1);

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

  return (
    <div className="App">
      <Movies
        movieList={movies}
        onDelete={handleDelete}
        onChange={handleChange}
        currentPage={currentPage}
        pageSize={moviesPerPage}
      />
    </div>
  );
}

export default App;
