const moviesInGenre = (movieList, genre) => {
  console.log(genre);
  if (genre === "all") return movieList;
  const filteredMovies = movieList.filter((m) => m.genre.name === genre);
  return filteredMovies;
};

export default moviesInGenre;
