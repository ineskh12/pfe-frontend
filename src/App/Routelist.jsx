import React from "react";
import "./styles.css";
import MainPage from "../components/MainPage"
import Dashboard from "../components/Dashboard";
import Template from "../components/templates/Template";
import ListTemplate from '../components/templates/ListTemplate';
import Detailstemplate from  '../components/templates/Detailstemplate';
import EditTemplate from '../components/templates/EditTemplate'
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import App from './App';

const useStyles = makeStyles({});

export default function Routelist() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
  
      <Switch>
      <Route exact from="/DnDWeviooReact/" render={() => <App/>} />
      <Route exact from="/DnDWeviooReact/main" render={() => <MainPage />} />
        <Route exact from="/DnDWeviooReact/dashboard" render={() => <Dashboard  />} />
        <Route exact from="/DnDWeviooReact/edit"  render={() => <EditTemplate  />} />
        <Route path="/DnDWeviooReact/details" exact component={Detailstemplate} />
        <Route exact path="/DnDWeviooReact/template" render={() => <Template  />} />
        <Route exact path="/DnDWeviooReact/list" render={() => <ListTemplate  />} />
      </Switch>
    </div>
  );
}
