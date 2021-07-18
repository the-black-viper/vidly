import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = `${apiURL}/movies`;

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function MoviesInDB() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
  console.log(movie);
  if (movie._id) {
    const movieObj = { ...movie };
    delete movieObj._id;
    http.put(movieUrl(movie._id), movieObj);
  }
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
