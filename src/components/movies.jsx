import React from "react";
import { useEffect } from "react";
import MoviesTable from "./movies-table";
import MoviePagination from "./pagination";
import Paginate from "../utils/paginate";
import GenreFilter from "./genre-filter";
import moviesInGenre from "../utils/sortedGenre";
import orderBy from "../utils/sortBy";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { deleteMovie, fetchMovies } from "../services/movieService";

const Movies = ({ user }) => {
  const moviesPerPage = 5;
  const [currentPage, setPage] = useState(1);
  const [genre, setGenre] = useState("all");
  const [sortPath, setSort] = useState({ path: undefined, order: "asc" });
  const [searchInput, setInput] = useState("");
  const [allMovies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // Get movies
  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies();
      console.log(movies);
      setMovies(movies);
    };
    getMovies();
  }, []);

  // Get genres
  useEffect(() => {
    const getUniqueGenres = async () => {
      // Get genres
      const { data: genres } = await getGenres();
      const tempGenres = genres.map((g) => g.name);
      setGenres(tempGenres);
    };
    getUniqueGenres();
  }, []);

  console.log(genres);
  const handleChange = (event, value) => {
    console.log("Page Changed", value);
    setPage(value);
  };

  const handleDelete = (movieID) => {
    console.log(movieID);
    const originalMovies = allMovies;
    console.log(originalMovies);
    const tempMovies = originalMovies.filter((m) => m._id !== movieID);
    console.log(tempMovies);
    setMovies(originalMovies.filter((m) => m._id !== movieID));

    try {
      console.log("Attempting to delete movie");
      console.log(allMovies);
      deleteMovie(movieID);
    } catch (error) {
      console.log("Error deleting movie");
      if (error.response && error.response.status === "404")
        alert("Movie may have already been deleted");
      setMovies(originalMovies);
    }
  };

  const handleGenre = (genre) => {
    setInput("");
    setGenre(genre);
    setPage(1);
  };

  const handleSort = (path, order) => {
    console.log("current order:", order);
    const sortColumn = { path, order };
    if (sortPath.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    }
    console.log(sortColumn);
    setSort(sortColumn);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    console.log(value);
    setInput(value);
  };

  // Get all movies in the genre;
  const genreFiltered = moviesInGenre(allMovies, genre);

  // Show movies matching search query
  const searchFilteredMovies = genreFiltered.filter((m) => {
    return m.title
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchInput.toLowerCase().replace(/\s/g, ""));
  });

  const sortedMovies = searchFilteredMovies
    .concat()
    .sort(orderBy([sortPath.path], [sortPath.order]));

  // Get starting index of the first movie to displayed in a page
  const startIndex = (currentPage - 1) * moviesPerPage;
  // Get movies to be displayed per page
  const movies = Paginate(sortedMovies, startIndex, moviesPerPage);

  return (
    <React.Fragment>
      {user && (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/newmovie"
        >
          Add Movie
        </Button>
      )}
      <TextField
        label="Seach Movies"
        id="outlined-start-adornment"
        className="search-field"
        value={searchInput}
        variant="outlined"
        onChange={handleSearch}
      />
      <MoviesTable
        movies={movies}
        onDelete={handleDelete}
        onSort={handleSort}
        sortColumn={sortPath}
      />
      <MoviePagination
        numMovies={genreFiltered.length}
        onChange={handleChange}
        pageSize={moviesPerPage}
      />
      <GenreFilter onChange={handleGenre} genres={genres} />
    </React.Fragment>
  );
};

export default Movies;
