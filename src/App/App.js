import React from "react";
import "./styles.css";

import MainPage from "../components/MainPage";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <MainPage />
     
    </div>
  );
}
