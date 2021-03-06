import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar2({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/movies">
            Movies
          </Button>
          <Button color="inherit" component={Link} to="/customers">
            Customers
          </Button>{" "}
          <Button color="inherit" component={Link} to="/rentals">
            Rentals
          </Button>
          {!user && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/profile">
                {user.name}
              </Button>
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
