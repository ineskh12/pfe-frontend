import React from "react";

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Totaltemplates from "../components/templates/Totaltemplates";

import Mostused from "../components/templates/Mostused";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const Dashboard = () => {
 
  const classes = useStyles();
  
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
       <Container maxWidth="lg" className={classes.container}>
       <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Totaltemplates/>
              </Paper>
            </Grid>
            

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Mostused/>
              </Paper>
            </Grid>


            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                ines
              </Paper>
            </Grid>
            
            </Grid>

           </Container>

    

   
    </div>
  );
};

export default Dashboard;
