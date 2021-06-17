import React, { useEffect, useState } from "react";
import { getMovies } from "../services/fakeMovieService";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";

function Movies() {
  const [movies, setMovies] = React.useState(
    getMovies().map((movie) => ({
      ...movie,
      id: movie._id,
      genreName: movie.genre.name,
    }))
  );

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setMovies(movies.filter((movie) => movie.id !== selectionModel));
  }, [selectionModel]);

  const columns = [
    {
      field: "title",
      filterable: false,
      headerAlign: "center",
      headerName: "Title",
      sortable: false,
      width: 150,
    },
    {
      field: "genreName",
      filterable: false,
      headerAlign: "center",
      headerName: "Genre",
      sortable: false,
      width: 130,
    },
    {
      field: "numberInStock",
      filterable: false,
      headerAlign: "center",
      headerName: "Stock",
      sortable: false,
      width: 130,
    },
    {
      field: "dailyRentalRate",
      filterable: false,
      headerAlign: "center",
      headerName: "Rate",
      sortable: false,
      width: 130,
    },
    {
      field: "deleteButton",
      filterable: false,
      headerAlign: "center",
      headerName: "Action",
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={() => {
              console.log(params.id);
              setSelectionModel(params.id);
              console.log(selectionModel);
            }}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  let header;
  if (movies.length !== 0)
    header = (
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={movies}
          columns={columns}
          pageSize={10}
          disableColumnMenu
        />
        <Pagination count={10} variant="outlined" />
      </div>
    );
  else {
    header = <h1>No more movies</h1>;
  }
  return <React.Fragment>{header}</React.Fragment>;
}

export default Movies;
