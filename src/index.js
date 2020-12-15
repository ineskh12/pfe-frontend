import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "../src/App/Route.jsx";
import CssBaseline from "@material-ui/core/CssBaseline";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
      <Route />
    </Router>
  </React.StrictMode>,
  rootElement
);
/* 
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../src/App/App";
import CssBaseline from "@material-ui/core/CssBaseline";

const rootElement = document.getElementById("root");
//const gridProps = window.gridProps || {};
ReactDOM.render(
 
    <Router>
      <CssBaseline />
      <App />
    </Router>,

  rootElement,
);

 */