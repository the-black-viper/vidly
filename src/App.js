// import "./App.css";
import Movies from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Customer from "./components/customer";
import Rentals from "./components/rentals";
import SignIn from "./components/login";
import Register from "./components/register";
import NewMovie from "./components/new-movie";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={SignIn} />
          <Route path="/movies/:id" component={NewMovie} />
          <Route path="/newmovie" component={NewMovie} />
          <Route path="/movies" component={Movies} />
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
