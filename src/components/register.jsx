import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  registerSchema,
} from "../utils/validateSchema";
import * as userService from "../services/userService";

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

export default function Register() {
  const classes = useStyles();

  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorFlag, setError] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [errorText, setErrorText] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disabledFlag, setDisable] = useState(false);

  // Hook to disable submit button while inputs are invalid
  useEffect(() => {
    console.log(account);
    const validAccount = validateInput(account, registerSchema);
    validAccount ? setDisable(false) : setDisable(true);
  }, [account]);

  // Check input fields and sets error text
  useEffect(() => {
    const tempErrors = { ...errorFlag };
    const tempErrorText = { ...errorText };
    Object.entries(tempErrors).forEach(([errorName, enabled]) => {
      enabled
        ? (tempErrorText[errorName] = getErrorText(errorName))
        : (tempErrorText[errorName] = "");
      setErrorText(tempErrorText);
    });
  }, [account]);

  // Validate input field
  const validateField = (input) => {
    const tempError = { ...errorFlag };
    const fieldName = Object.keys(input)[0];
    const schema = {
      username: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
    };
    const inputValid = validateInput(input, schema[fieldName]);
    inputValid ? (tempError[fieldName] = false) : (tempError[fieldName] = true);
    setError(tempError);
  };

  // TODO: Move to config
  const getErrorText = (fieldName) => {
    const errorText = {
      email: "Please enter a valid email",
      username: "Username must be  only  contain alpha-numeric characters",
      password:
        "Password must contain lowercase and uppercase letters, a numeric character and a special symbol",
    };

    return errorText[fieldName];
  };

  // Handle Password and Email Change
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const tempObject = { [name]: value };
    validateField(tempObject); // Validate individual field change
    const tempAccount = { ...account, ...tempObject };
    setAccount(tempAccount);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    try {
      await userService.register(account);
    } catch (error) {
      const { data: errorMessage, status } = error.response;
      if (status === 400) {
        const tempErrors = { ...error };
        const tempErrorText = { ...errorText };
        tempErrorText["email"] = errorMessage;
        setErrorText(tempErrorText);
        tempErrors["email"] = true;
        setError(tempErrors);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="uname"
                error={errorFlag.username}
                helperText={errorText.username}
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorFlag.email}
                helperText={errorText.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorFlag.password}
                helperText={errorText.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justifycontent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
