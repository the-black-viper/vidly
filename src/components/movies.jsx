import React from "react";
import MoviesTable from "./movies-table";
import MoviePagination from "./pagination";
import Paginate from "../utils/paginate";
import GenreFilter from "./genre-filter";
import moviesInGenre from "../utils/sortedGenre";
import orderBy from "../utils/sortBy";

const Movies = ({
  movieList,
  onDelete,
  onChange,
  onSort,
  currentPage,
  pageSize,
  genre,
  onGenreChange,
  sortColumn,
}) => {
  // Get all movie genres
  const allGenres = movieList.map((m) => m.genre.name);
  // Filter and get unique genres
  const uniqueGenres = [...new Set(allGenres)];
  // Get all movies in the genre;
  const filteredMovies = moviesInGenre(movieList, genre);

  const sortedMovies = filteredMovies
    .concat()
    .sort(orderBy([sortColumn.path], [sortColumn.order]));

  // Get starting index of the first movie to displayed in a page
  const startIndex = (currentPage - 1) * pageSize;
  // Get movies to be displayed per page
  const movies = Paginate(sortedMovies, startIndex, pageSize);

  return (
    <React.Fragment>
      <MoviesTable
        movies={movies}
        onDelete={onDelete}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <MoviePagination
        numMovies={filteredMovies.length}
        onChange={onChange}
        pageSize={pageSize}
      />
      <GenreFilter onChange={onGenreChange} genres={uniqueGenres} />
    </React.Fragment>
  );
};

export default Movies;
