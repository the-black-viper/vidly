import React from "react";
import { Button } from "@material-ui/core";
const MovieForm = ({ match, history }) => {
  return (
    <React.Fragment>
      <h1>{`Movie ID: ${match.params.id}`}</h1>
      <Button onClick={() => history.push("/movies")}> Back </Button>
    </React.Fragment>
  );
};

export default MovieForm;
