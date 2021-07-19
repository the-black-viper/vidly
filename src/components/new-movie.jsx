import React from "react";
import { useEffect, useState } from "react";
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
import { newMovieSchema } from "../utils/validateSchema";
import { saveMovie } from "../services/movieService";
import { MenuItem } from "@material-ui/core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

function validateInput(input, schema) {
  const result = schema.validate(input);
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
  const classes = useStyles();
  // Get Location object to get path
  const loc = useLocation();
  const params = useParams();
  const history = useHistory();

  const [account, setAccount] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const [errorFlag, setError] = useState({
    title: false,
    genre: false,
    numberInStock: false,
    dailyRentalRate: false,
  });
  const [disabledFlag, setDisable] = useState(false);
  const [genres, setGenres] = useState([]);

  // Get genres
  useEffect(() => {
    const getUniqueGenres = async () => {
      // Get genres
      const { data: genres } = await getGenres();
      // const tempGenres = genres.map((g) => g.name);
      setGenres(genres);
    };
    getUniqueGenres();
  }, []);

  // Get movies data
  useEffect(() => {
    const getMovieData = async () => {
      const movieId = params.id;
      if (loc.pathname !== "/newmovie") {
        try {
          const { data: movie } = await getMovie(movieId);
          setAccount(mapToViewModel(movie));
        } catch (error) {
          history.replace("/notfound");
        }
      } else return;
    };
    getMovieData();
  }, [loc.pathname, params.id, history]);

  // Disable submit button while inputs are invalid
  useEffect(() => {
    const tempAccount = { ...account, title: account.title.replace(/\s/g, "") };
    const validAccount = validateInput(tempAccount, newMovieSchema);
    validAccount ? setDisable(false) : setDisable(true);
  }, [account]);

  // Validate input field
  const validateField = (inputObject) => {
    const fieldName = Object.keys(inputObject)[0];
    const tempError = { ...errorFlag };
    const inputValid = validateInput(inputObject, newMovieSchema);
    inputValid ? (tempError[fieldName] = false) : (tempError[fieldName] = true);
    setError(tempError);
  };

  // Handle input change
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const tempAccount = { ...account, [name]: value };
    validateField(tempAccount);
    setAccount(tempAccount);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const withError = Object.keys(errorFlag).some((k) => errorFlag[k]);
    if (withError) return console.error("ERROR Submitting form");
    saveMovie(account);
  };

  // Reformat movie object to the accepted format
  const mapToViewModel = (movie) => {
    const newObj = {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
    return newObj;
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
                name="genreId"
                variant="outlined"
                label="Genre"
                value={account.genreId}
                onChange={handleChange}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre._id} value={genre._id}>
                    {genre.name}
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
