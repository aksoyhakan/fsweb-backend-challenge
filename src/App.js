import React from "react";
import { Switch, Route } from "react-router-dom";
import NavLinkHeader from "./components/NavLinkHeader";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Users from "./components/Users";

function App() {
  return (
    <div>
      <NavLinkHeader />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/api/auth/login">
          <Login />
        </Route>
        <Route path="/api/auth/register">
          <Register />
        </Route>
        <Route path="/api/posts">
          <Posts />
        </Route>
        <Route path="/api/users">
          <Users />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
