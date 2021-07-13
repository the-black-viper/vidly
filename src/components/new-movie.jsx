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
import { getMovies, saveMovie } from "../services/fakeMovieService";
import { MenuItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";

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

// New Movie Component
export default function NewMovie(props) {
  const movies = getMovies().map((movie) => ({
    ...movie,
    id: movie._id,
    genre: movie.genre.name,
  }));

  console.log(movies);
  // Get all movie genres
  const allGenres = movies.map((m) => m.genre);
  console.log(allGenres);
  // Filter and get unique genres
  const uniqueGenres = [...new Set(allGenres)];
  console.log(uniqueGenres);

  const findMovie = (movies, id) => {
    const targetMovie = movies.find((movie) => movie.id === id);
    return targetMovie;
  };

  const getMovieData = (props) => {
    // Get the movie
    const { match } = props;
    const movieID = match.params.id;
    const movie = findMovie(movies, movieID);
    console.log(movie);
    const tempAccount = { ...movie };
    console.log(tempAccount);
    return tempAccount;
  };
  const loc = useLocation();
  console.log(loc);
  props ? console.log("props present", props) : console.log("no props");
  const classes = useStyles();
  const [account, setAccount] = useState(
    // Check path
    loc.pathname !== "/newmovie"
      ? getMovieData(props)
      : {
          title: "",
          genre: "",
          numberInStock: "",
          dailyRentalRate: "",
        }
  );

  const [errorFlag, setError] = useState({
    title: false,
    genre: false,
    numberInStock: false,
    dailyRentalRate: false,
  });
  const [disabledFlag, setDisable] = useState(false);

  // Hook to disable submit button while inputs are invalid
  useEffect(() => {
    console.log(account);
    // Normalize values in a temporary Values
    const tempAccount = { ...account };
    for (let key in tempAccount) {
      try {
        console.log(typeof tempAccount[key]);
        if (typeof tempAccount[key] === "string")
          tempAccount[key].replace(/\s/g, "");
      } catch {
        console.error("ERROR");
      }
    }

    const validAccount = validateInput(tempAccount, newMovieSchema);
    validAccount ? setDisable(false) : setDisable(true);
  }, [account]);

  // Handle input change
  const handleChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    const newValue = value.split(" ").join("");
    // if (typeof value === "string") value.replace(/\s/g, "");
    const tempObject = { [name]: newValue };
    const tempError = { ...errorFlag };
    console.log(tempObject);
    const inputValid =
      name === "title"
        ? validateInput(tempObject, titleSchema)
        : name === "dailyRentalRate"
        ? validateInput(tempObject, rateSchema)
        : name === "genre"
        ? validateInput(tempObject, genreSchema)
        : name === "numberInStock"
        ? validateInput(tempObject, stockSchema)
        : console.error("ERROR");
    console.log(tempError);
    inputValid ? (tempError[name] = false) : (tempError[name] = true);
    console.log(tempError);
    setError(tempError);

    const tempAccount = { ...account, [name]: value };
    // tempAccount[name] = value;
    setAccount(tempAccount);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(errorFlag);
    const withError = Object.keys(errorFlag).some((k) => errorFlag[k]);
    if (withError) return console.error("ERROR Submitting form");
    console.log("Submitted", account);
    saveMovie(account);
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
                value={account.title}
                onChange={handleChange}
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
                onChange={handleChange}
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
                error={errorFlag.numberInStock}
                value={account.numberInStock}
                required
                fullWidth
                id="numberInStock"
                label="Number in Stock"
                name="numberInStock"
                autoComplete="numberInStock"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorFlag.dailyRentalRate}
                value={account.dailyRentalRate}
                required
                fullWidth
                id="dailyRentalRate"
                label="Rental Rate"
                name="dailyRentalRate"
                autoComplete="rate"
                onChange={handleChange}
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
