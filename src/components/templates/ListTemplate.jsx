import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import "./Home.css";
import { useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    outline: 'none'
  },container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function ListTemplate() {
  const classes = useStyles();

 

  const url = "https://nestjs-backend-dnd.herokuapp.com/templates/all"
  const [templates, setTemplates] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');
  //const [open, setOpen] = React.useState(false);

  /* const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } */

  /*   setOpen(false);
  }; */
  const history = useHistory();
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setTemplates(res.data);
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
        
        {error ? <>
          <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert severity="error">
              {error}
            </Alert>
          </Snackbar>

        </> :
    

          templates.map((template, index) =>
          <Container maxWidth="lg" className={classes.container}>
        
            <Card key={index} className="box" variant="outlined" >
              <CardActionArea>

                <CardContent style={{maxHeight: 100}} title={template.name}>
                  <Typography component="h2" style={{width: 200}} noWrap>
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">

                    Version:<br></br>
                    Créé à:<br></br>
                    Mis à jour à:
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions >

                <Button size="small" color="primary" style={{outline: 'none'}} onClick={() => history.push('/DnDWeviooReact/details')} > Détails
                </Button>
                <IconButton aria-label="delete" color="primary" style={{ marginLeft: 90 }}  >
                  <DeleteIcon />
                </IconButton>

                <IconButton aria-label="edit" color="primary" style={{ marginLeft: -5 }} onClick={() => history.push('/DnDWeviooReact/edit')} >

                  <EditIcon />
                </IconButton>



              </CardActions>
            </Card>
            </Container>
          )


        }
        
      </div>
    );
  } else {

    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  }

}