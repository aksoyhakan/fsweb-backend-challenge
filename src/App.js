import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavLinkHeader from "./components/NavLinkHeader";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import Users from "./components/Users";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((store) => store.token);

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
          {token ? <Posts /> : <Redirect to="/" />}
        </Route>
        <Route path="/api/users">
          {token ? <Users /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
