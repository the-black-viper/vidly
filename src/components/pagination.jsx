import React, { Component } from "react";
import Pagination from "@material-ui/lab/Pagination";

class MoviePagination extends Component {
  render() {
    return (
      <div>
        <Pagination count={10} variant="outlined" />
      </div>
    );
  }
}

export default MoviePagination;
