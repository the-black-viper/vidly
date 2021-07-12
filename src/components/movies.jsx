import React from "react";
import MoviesTable from "./movies-table";
import MoviePagination from "./pagination";
import Paginate from "../utils/paginate";
import GenreFilter from "./genre-filter";
import moviesInGenre from "../utils/sortedGenre";
import orderBy from "../utils/sortBy";
import { Button } from "@material-ui/core";
import { getMovies } from "../services/fakeMovieService";
import { useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const moviesPerPage = 5;
  const [currentPage, setPage] = useState(1);
  const [genre, setGenre] = useState("all");
  const [sortPath, setSort] = useState({ path: undefined, order: "asc" });
  const [allMovies, setMovies] = useState(
    getMovies().map((movie) => ({
      ...movie,
      id: movie._id,
      genre: movie.genre,
    }))
  );

  const handleChange = (event, value) => {
    console.log("Page Changed", value);
    setPage(value);
  };

  const handleDelete = (movieID) => {
    console.log(movieID);
    setMovies(allMovies.filter((m) => m._id !== movieID));
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

  // Get all movie genres
  const allGenres = allMovies.map((m) => m.genre.name);
  // Filter and get unique genres
  const uniqueGenres = [...new Set(allGenres)];
  // Get all movies in the genre;
  const filteredMovies = moviesInGenre(allMovies, genre);

  const sortedMovies = filteredMovies
    .concat()
    .sort(orderBy([sortPath.path], [sortPath.order]));

  // Get starting index of the first movie to displayed in a page
  const startIndex = (currentPage - 1) * moviesPerPage;
  // Get movies to be displayed per page
  const movies = Paginate(sortedMovies, startIndex, moviesPerPage);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/newmovie"
      >
        Add Movie
      </Button>
      <MoviesTable
        movies={movies}
        onDelete={handleDelete}
        onSort={handleSort}
        sortColumn={sortPath}
      />
      <MoviePagination
        numMovies={filteredMovies.length}
        onChange={handleChange}
        pageSize={moviesPerPage}
      />
      <GenreFilter onChange={handleGenre} genres={uniqueGenres} />
    </React.Fragment>
  );
};

export default Movies;
