import React from "react";
import "./styles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MainPage from "../components/MainPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
  
    <div className={classes.container}>
       <Router>   <CssBaseline />
      <MainPage /></Router>
    
     
    </div>
   
  );
}
