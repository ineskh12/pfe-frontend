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
