// import "./App.css";
import Movies from "./components/movies";
import React, { useState } from "react";
import { getMovies } from "./services/fakeMovieService";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Customer from "./components/customer";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import SignIn from "./components/login";
import Register from "./components/register";
import { Button } from "@material-ui/core";
import NewMovie from "./components/new-movie";

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
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={SignIn} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/newmovie" component={NewMovie} />
          <Route
            path="/movies"
            render={() => (
              <React.Fragment>
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
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/newmovie"
                >
                  Add Movie
                </Button>
              </React.Fragment>
            )}
          />

          <Redirect from="/" exact to="/movies" />
          <Route path="/customers" component={Customer} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/rentals" component={Rentals} />

          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
