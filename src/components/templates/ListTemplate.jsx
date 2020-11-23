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
  },
}));

export default function Home() {
  const classes = useStyles();

  let history = useHistory();

  const url = "http://nestjs-backend-dnd.herokuapp.com/templates/all"
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

                <Button size="small" color="primary" style={{outline: 'none'}} onClick={() => history.push('/template/view')} >
                  Détails
                </Button>
                <IconButton aria-label="delete" color="primary" style={{ marginLeft: 90 }}  >
                  <DeleteIcon />
                </IconButton>

                <IconButton aria-label="edit" color="primary" style={{ marginLeft: -5 }} onClick={() => history.push('/template/edit/')} >

                  <EditIcon />
                </IconButton>



              </CardActions>
            </Card>
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