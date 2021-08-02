import "./global_components/CSS/App.css";
import React, { Component, Redirect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./global_components/NavBar";
import HomePage from "./components/pages/HomePage";
import RegisterForm from "./components/pages/RegisterForm";
import PainTracking from "./components/pages/PaintTacking";
// import VideoShorts from "./components/pages/VideoShorts";
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
      title: "Registration",
      ref: "/register",
      component: RegisterForm,
    },
    {
      id: 3,
      title: "Garden Tracker",
      ref: "/painTracking",
      component: PainTracking,
    },
    {
      id: 4,
      title: "Video Shorts",
      ref: "/videoplayer",
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
