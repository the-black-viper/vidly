import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { useState } from "react";

const get = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value
  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj
  );
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

const MoviesTable = ({ movies, sortColumn, onSort, onDelete }) => {
  const [user, ,] = useState(auth.getUserToken());
  const sortPaths = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "dailyRentalRate", label: "Rental Rate" },
    { path: "numberInStock", label: "Stock" },
  ];

  const deleteColumn = {
    key: "button",
    path: "",
    label: "",
    content: (item) => {
      return (
        <Button
          onClick={() => {
            onDelete(item._id);
          }}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      );
    },
  };

  const constructor = () => {
    if (user && user.isAdmin) {
      sortPaths.push(deleteColumn);
    }
    return null;
  };
  constructor();

  const renderCell = (movie, column) => {
    if (column.content) return column.content(movie);
    return get(movie, column.path);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow key="table-heading">
            {sortPaths.map((item) => (
              <TableCell
                key={item.path}
                onClick={() => {
                  onSort(item.path, sortColumn.order);
                }}
                align="center"
              >
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie._id}>
              {sortPaths.map((column) => (
                <TableCell key={column.path} align="center">
                  {renderCell(movie, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MoviesTable;
