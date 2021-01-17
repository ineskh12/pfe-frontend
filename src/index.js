import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Routelist from "./App/Routelist.jsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  

    <Router>
      <CssBaseline />
      
      <Routelist />
    
    </Router>,
 
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