import React from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
function preventDefault(event) {
    event.preventDefault();
  }
  
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });
const Totaltemplates = () => {
    const classes = useStyles();
    return (
      <React.Fragment>
        <h2>Modèles</h2>
        <Typography component="p" variant="h4">
       12
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
        cette semaine
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
          voir plus des détails
          </Link>
        </div>
      </React.Fragment>)
};

export default Totaltemplates;
