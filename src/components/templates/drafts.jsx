import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
//import Base64 from '../atob';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';


import "./Home.css";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
 
  avatar: {
    backgroundColor: blue[400],
  },container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  }
  
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Dafts() {
  const classes = useStyles();
 
  /* http://localhost:3002/templates/getByUser/${id}` */

  const url = "http://localhost:3002/templates/all"
  const [templates, setTemplates] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  /* const parseJwt = () => {
    var base64Url = localStorage.getItem('login').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(Base64.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }; */
  const history = useHistory();
  
 

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setTemplates(res.data);
        console.log(res.data)
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true)
      })
  }, []);
  if (load) {
    
  return (
    <div className="container">
     {/*   {JSON.stringify(parseJwt().first_name).replace(/\"/g, "")}
       */}
       {error ? <>
          <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert severity="error">
              {error}
            </Alert>
          </Snackbar>

        </> :
          templates.map((template,index) => 
        
      
          <Container maxWidth="lg" className={classes.root} key={index}>
      
          <Card key={template._id} className="box" variant="outlined" >
      <CardHeader
        
       
        title={template.name}
        subheader={template.createdAt}
      />
     
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Version:{template.version} 
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Mis à jour à:{template.updatedAt}
        {template.state}
        </Typography>
      </CardContent>
      <CardActions >

<Button size="small" color="primary" style={{outline: 'none'}} onClick={() => history.push('/DnDWeviooReact/details')} > Détails
</Button>




</CardActions>
     
    </Card>
    </Container>
      
  )


}
  
  </div>
  );

    } else {  return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }}


