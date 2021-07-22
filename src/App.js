// import "./App.css";
import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import Movies from "./components/movies";
import NavBar2 from "./components/appbar";
import NewMovie from "./components/new-movie";
import Customer from "./components/customer";
import Rentals from "./components/rentals";
import SignIn from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/protectedRoute";
import "./App.css";

function App() {
  const [user, setUser] = useState(undefined);

  // Check if any user is logged in.
  useEffect(() => {
    const currentUser = auth.getUserToken();
    setUser(currentUser);
  }, []);

  return (
    <div className="App">
      <NavBar2 className="Navbar" user={user} />
      <div className="content">
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={SignIn} />
          <ProtectedRoute path="/movies/:id" component={NewMovie} />
          <ProtectedRoute path="/newmovie" component={NewMovie} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          />
          <Redirect from="/" exact to="/movies" />
          <Route path="/customers" component={Customer} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/rentals" component={Rentals} />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
