import React from "react";
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
import { useState } from "react";
import {
  emailSchema,
  loginSchema,
  loginPasswordSchema,
} from "../utils/validateSchema";
import { useEffect } from "react";
import { useRef } from "react";
import { login } from "../services/authService";

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
        Vidly Website
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errorFlag, setError] = useState({ email: false, password: false });
  const [errorText, setErrorText] = useState({ email: "", password: "" });
  const [disabledFlag, setDisable] = useState(false);

  // Hook to disable submit button while inputs are invalid
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const validAccount = validateInput(account, loginSchema);
      validAccount ? setDisable(false) : setDisable(true);
    }
  }, [account]);

  // Check input fields and sets error text
  useEffect(() => {
    const tempErrors = { ...errorFlag };
    const tempErrorText = { ...errorText };
    Object.entries(tempErrors).forEach(([errorName, enabled]) => {
      console.log(errorName, enabled);
      enabled
        ? (tempErrorText[errorName] = "Invalid Input")
        : (tempErrorText[errorName] = "");
      setErrorText(tempErrorText);
    });
  }, [account]);

  const validateField = (inputObject) => {
    const tempError = { ...errorFlag };
    const fieldName = Object.keys(inputObject)[0];
    console.log(fieldName);
    const schema = {
      email: emailSchema,
      password: loginPasswordSchema,
    };
    const inputValid = validateInput(inputObject, schema[fieldName]);
    inputValid ? (tempError[fieldName] = false) : (tempError[fieldName] = true);
    setError(tempError);
  };
  // Handle Password and Email Change
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const tempObject = { [name]: value };
    validateField(tempObject);
    const tempAccount = { ...account, ...tempObject };
    console.log(tempAccount);
    setAccount(tempAccount);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(account);
    const { email, password } = account;
    try {
      const { data: jwt } = await login(email, password);
      console.log(jwt);
      localStorage.setItem("token", jwt);
      // history.push("/");
      window.location = "/"; // Reload page
    } catch (error) {
      const { data: errorMessage, status } = error.response;
      if (status === 400) {
        const tempErrors = { ...errorFlag };
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={errorFlag.email}
            variant="outlined"
            helperText={errorText.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => handleChange(event)}
          />
          <TextField
            error={errorFlag.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => handleChange(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabledFlag}
            className={classes.submit}
            onClick={(event) => handleSubmit(event)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
