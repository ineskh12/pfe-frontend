import React from "react";
import "./styles.css";
import MainPage from "../components/MainPage"

import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import App from './App';
import Dashboard from "../components/Dashboard";
import Template from "../components/templates/Template";

const useStyles = makeStyles({});
 
export default function Routelist() {
 

  const classes = useStyles();
  
  
  return (

    <div className={classes.container}>
  
      <Switch >
      
      <Route exact from="/DnDWeviooReact/" render={() => <App/>} />
      <Route exact from="/DnDWeviooReact/main" render={() => <MainPage />} />
      <Route exact path="/DnDWeviooReact/dashboard" component={Dashboard} />
        <Route  exact path="/DnDWeviooReact/template" component={Template} />
     
{/*         <Route  exact path="/DnDWeviooReact/list" component={ListTemplate} />
           <Route  exact path="/DnDWeviooReact/drafts" component={Drafts} /> 
           <Route  exact path="/DnDWeviooReact/edit" component={EditTemplate} />
           <Route  exact path="/DnDWeviooReact/details" component={Detailstemplate} />  */}
      </Switch>
    </div>
  );
}