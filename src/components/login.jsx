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
import combinedSchema from "../utils/validateSchema";
import { emailSchema, passwordSchema } from "../utils/validateSchema";
import { useEffect } from "react";
import { useRef } from "react";

function validateInput(input, schema) {
  const result = schema.validate(input);
  console.log(result);
  const noError = !Object.keys(result).includes("error");
  // console.log(noError);
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
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errorFlag, setError] = useState({ email: false, password: false });
  const [helperText, setHelperText] = useState({ email: "", password: "" });
  const [disabledFlag, setDisable] = useState(false);
  const classes = useStyles();

  // Hook to disable submit button
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const validAccount = validateInput(account, combinedSchema);
      const withError = Object.keys(errorFlag).some((k) => errorFlag[k]);
      validAccount && !withError ? setDisable(false) : setDisable(true);
    }
  }, [account]);

  // Handle Password and Email Change
  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    const tempObject = { [name]: value };
    console.log(tempObject);
    const tempError = { ...errorFlag };
    const inputValid =
      name === "email"
        ? validateInput(tempObject, emailSchema)
        : validateInput(tempObject, passwordSchema);
    inputValid ? (tempError[name] = false) : (tempError[name] = true);
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={errorFlag.email}
            helperText={helperText.email}
            variant="outlined"
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
            helperText={helperText.password}
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
