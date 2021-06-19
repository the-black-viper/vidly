import React from "react";
import Pagination from "@material-ui/lab/Pagination";

const MoviePagination = ({ numMovies, onChange, pageSize }) => {
  const pageCount = Math.ceil(numMovies / pageSize);
  console.log(`PageCount: ${pageCount}`);

  if (pageCount === 1) return null;
  return (
    <div>
      <Pagination
        count={pageCount}
        onChange={onChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default MoviePagination;
