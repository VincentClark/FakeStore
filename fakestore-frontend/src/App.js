import "./global_components/CSS/App.css";
import React, { Component, Redirect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./global_components/NavBar";
import HomePage from "./components/pages/HomePage";
import Twilio from "./components/pages/Twilio";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  const navConfig = [
    {
      id: 1,
      title: "Home",
      ref: "/",
      component: HomePage,
    },
    {
      id: 2,
      title: "Twilio",
      ref: "/twilio",
      component: Twilio,
    },

  ];

  return (
    <Router>
      <NavBar navConfig={navConfig} />
      <div className="container-fluid" id="main">
        <Switch>
          {navConfig.map((element) => (
            <Route key={element.key} path={element.ref} component={element.component} exact />
          ))}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
