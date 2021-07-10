import React from "react";
import { useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  titleSchema,
  rateSchema,
  stockSchema,
  genreSchema,
  newMovieSchema,
} from "../utils/validateSchema";
import { getMovies } from "../services/fakeMovieService";
import { MenuItem } from "@material-ui/core";

function validateInput(input, schema) {
  const result = schema.validate(input);
  console.log(result);
  const noError = !Object.keys(result).includes("error");
  return noError;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const movies = getMovies().map((movie) => ({
  ...movie,
  id: movie._id,
  genreName: movie.genre.name,
}));

// Get all movie genres
const allGenres = movies.map((m) => m.genre.name);
// Filter and get unique genres
const uniqueGenres = [...new Set(allGenres)];
console.log(uniqueGenres);
export default function NewMovie() {
  const classes = useStyles();
  const [account, setAccount] = useState({
    title: "",
    genre: "",
    stock: "",
    rate: "",
  });
  const [errorFlag, setError] = useState({
    title: false,
    genre: false,
    stock: false,
    rate: false,
  });
  const [disabledFlag, setDisable] = useState(false);
  const [selectedGenre, setGenre] = useState("");
  // Hook to disable submit button while inputs are invalid
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log(account);
      const validAccount = validateInput(account, newMovieSchema);
      validAccount ? setDisable(false) : setDisable(true);
    }
  }, [account]);

  // Handle Password and Email Change
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name, value);
    const tempObject = { [name]: value };

    const tempError = { ...errorFlag };

    const inputValid =
      name === "title"
        ? validateInput(tempObject, titleSchema)
        : name === "rate"
        ? validateInput(tempObject, rateSchema)
        : name === "genre"
        ? validateInput(tempObject, genreSchema)
        : validateInput(tempObject, stockSchema);
    console.log(tempError);
    inputValid ? (tempError[name] = false) : (tempError[name] = true);
    console.log(tempError);
    setError(tempError);

    const tempAccount = { ...account };
    tempAccount[name] = value;
    setAccount(tempAccount);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errorFlag);
    const withError = Object.keys(errorFlag).some((k) => errorFlag[k]);
    withError
      ? console.error("ERROR Submitting form")
      : console.log("Submitted");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Movie
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="title"
                error={errorFlag.title}
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                onChange={(event) => handleChange(event)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="standard-select-currency"
                select
                error={errorFlag.genre}
                fullWidth
                name="genre"
                variant="outlined"
                label="Genre"
                value={account.genre}
                onChange={(event) => handleChange(event)}
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                {uniqueGenres.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorFlag.stock}
                required
                fullWidth
                id="stock"
                label="Number in Stock"
                name="stock"
                autoComplete="stock"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorFlag.rate}
                required
                fullWidth
                id="rate"
                label="Rental Rate"
                name="rate"
                autoComplete="rate"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabledFlag}
            onClick={handleSubmit}
            className={classes.submit}
          >
            Add Movie
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
