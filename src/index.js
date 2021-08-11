import React from "react";
import reactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LightApp from "./light";
import DarkApp from "./dark";
import Home from "./home";
import "./main.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dark">
          <DarkApp />
        </Route>
        <Route path="/light">
          <LightApp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

reactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
