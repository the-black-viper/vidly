import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import MoviePagination from "./pagination";
import Paginate from "../utils/paginate";
import GenreFilter from "./genre-filter";
import moviesInGenre from "../utils/sortedGenre";

const MovieTable = ({
  movieList,
  onDelete,
  onChange,
  currentPage,
  pageSize,
  genre,
  onGenreChange,
}) => {
  // Get all movie genres
  const allGenres = movieList.map((m) => m.genre.name);
  // Filter and get unique genres
  const uniqueGenres = [...new Set(allGenres)];
  // Get all movies in the genre;
  const filteredMovies = moviesInGenre(movieList, genre);

  // Get starting index of the first movie to displayed in a page
  const startIndex = (currentPage - 1) * pageSize;
  // Get movies to be displayed per page
  const movies = Paginate(filteredMovies, startIndex, pageSize);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center"> Genre </TableCell>
              <TableCell align="center"> Rental rate </TableCell>
              <TableCell align="center"> Stock </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie._id}>
                <TableCell component="th" scope="row" align="left">
                  {movie.title}
                </TableCell>
                <TableCell align="center">{movie.genre.name}</TableCell>
                <TableCell align="center">{movie.dailyRentalRate}</TableCell>
                <TableCell align="center">{movie.numberInStock}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      onDelete(movie._id);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MoviePagination
        numMovies={filteredMovies.length}
        onChange={onChange}
        pageSize={pageSize}
      />
      <GenreFilter onChange={onGenreChange} genres={uniqueGenres} />
    </React.Fragment>
  );
};

export default MovieTable;
