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
import App from '../App/App';

const useStyles = makeStyles({});

export default function Routelist() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
  
      <Switch>
  
      <Route exact from="/DnDWeviooReact/main" render={props => <MainPage {...props} />} />
        <Route exact from="/DnDWeviooReact/dashboard" render={props => <Dashboard {...props} />} />
        <Route exact from="/DnDWeviooReact/loginregister" render={props => <App {...props}/>} />
        <Route exact from="/DnDWeviooReact/" render={props => <App {...props}/>} />
        <Route exact from="/DnDWeviooReact/edit"  render={props => <EditTemplate {...props} />} />
        <Route exact from="/DnDWeviooReact/details" render={props => <Detailstemplate {...props} />} />
        <Route exact path="/DnDWeviooReact/template" render={props => <Template {...props} />} />
        <Route exact path="/DnDWeviooReact/list" render={props => <ListTemplate {...props} />} />
      </Switch>
    </div>
  );
}
