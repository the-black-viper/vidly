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
  const classes = useStyles();

  const handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    let tempAccount = { ...account };
    tempAccount[name] = value;
    setAccount(tempAccount);
  };

  const validate = (object) => {
    const tempErrors = { ...errorFlag };
    const tempText = { ...helperText };

    let emailFlag = object.email.trim().length < 2 ? true : false;
    tempErrors["email"] = emailFlag;
    let passwordFlag = object.password.trim().length < 2 ? true : false;
    tempErrors["password"] = passwordFlag;

    let emailText = tempErrors.email ? "Invalid Input" : "";
    tempText.email = emailText;
    let passwordText = tempErrors.password ? "Invalid Input" : "";
    tempText.password = passwordText;

    console.log(tempErrors);
    setError(tempErrors);
    setHelperText(tempText);

    let isError = Object.keys(tempErrors).some((k) => tempErrors[k]);
    return isError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(account);
    console.log(errors);
    // // console.log(Object.keys(errors));
    // if (errors) {
    //   // setError(true);
    //   setHelperText("Invalid input");
    // } else {
    //   const tempError = { ...errorFlag };
    //   tempError.email = false;
    //   tempError.password = false;
    //   setHelperText("");
    // }
    // Call server
    console.log("Submitted");
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
