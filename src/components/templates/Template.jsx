import React from "react";
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TestShow from "../classcomponents/TestShow";
import  Draggable  from '../classcomponents/Draggable';
import  Droppable  from '../classcomponents/Droppable';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing(1),
    
    
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
 
  
    
  },
  fixedHeight: {
    height: 500,
    
  },

  container: {
    //paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(4),
  },
}));
const Template = () => {
 
  const classes = useStyles();
  
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      
      
       <Container maxWidth="lg" className={classes.container}>
       
       <Grid container spacing={3}>
  
       <Grid item xs={12} >
              <Paper  style={{ height: 50}}>
              <Droppable id="dr1">


                <Draggable/>

              </Droppable>
              </Paper>
              </Grid>
            
              <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
         <TestShow/>
        
              </Paper>
            </Grid>
            {/* Recent Deposits */}
           
            </Grid>
            

           </Container>

    

   
    </div>
  );
};

export default Template ;
