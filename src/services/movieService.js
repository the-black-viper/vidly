import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = `${apiURL}/movies`;

export function MoviesInDB() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}

export function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    const movieObj = { ...movie };
    delete movieObj._id;
    http.put(apiEndpoint + "/" + movie._id, movieObj);
  }

  //   const movieObj = {
  //     // _id: "60f24f3c5fbx9d3a6c150fb1",
  //     title: "TheXHangover",
  //     numberInStock: 10,
  //     dailyRentalRate: 2,
  //     genreId: "60f24f3c5fb19d3a6c150fb0",
  //   };
  return http.post(apiEndpoint, movie);
}

export async function fetchMovies() {
  const { data } = await MoviesInDB();
  console.log(data);
  const movies = data.map((movie) => ({
    ...movie,
    id: movie._id,
    genre: movie.genre,
  }));
  console.log(movies);
  return movies;
}

// setSomeMovies(
// setMovies(
//   data.map((movie) => ({
//     ...movie,
//     id: movie._id,
//     genre: movie.genre,
//   }))
// );
