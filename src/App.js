import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import VehicleList from "./components/VehicleList";
import VehicleDetail from "./components/VehicleDetail";
import VehicleEdit from "./components/VehicleEdit";
import VehicleDelete from "./components/VehicleDelete";
import VehicleCreate from "./components/VehicleCreate";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar className="navbar navbar-default" />
        <Header />

        <hr />

        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/vehicles" render={() => <VehicleList />} />
          <Route
            exact
            path="/vehicles/create"
            render={() => <VehicleCreate />}
          />
          <Route
            exact
            path="/vehicles/detail/:id"
            render={props => <VehicleDetail id={props.match.params.id} />}
          />
          <Route
            exact
            path="/vehicles/edit/:id"
            render={props => <VehicleEdit id={props.match.params.id} />}
          />
          <Route
            exact
            path="/vehicles/delete/:id"
            render={props => <VehicleDelete id={props.match.params.id} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2020, Andre Bhaseen</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="container">
      <div className="masthead">
        <h2>Assignment 1</h2>
        <p>A vehicle management system.</p>
      </div>
    </div>
  );
};

// Function component for the navigation bar
const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand">
          Home page
        </Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/vehicles">
              Vehicle list
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vehicles/create">
              Add a Vehicle
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Function component for a content area
const Home = () => {
  return (
    <div>
      <p>This is the home page of the app.</p>
      <p>Click or tap an item on the nav menu.</p>
      <p>&nbsp;</p>
    </div>
  );
};

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
};
