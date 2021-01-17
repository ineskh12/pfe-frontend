import React from "react";
import loginImg from "./Wevioo.png";
import Link from '@material-ui/core/Link';
import { Redirect } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.wevioo.com/fr">
      Wevioo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
//let history = useHistory();


export class Register extends React.Component {
 
  constructor(props) {

    super(props);
     this.state={redirect: null,nom:'',prenom:'',email:'',pwd:''}
     this.registration = this.registration.bind(this);
    }
    registration = () => {
      axios.post('http://localhost:3002/users/add', {
        first_name: this.state.nom,
        last_name: this.state.prenom, 
        email:this.state.email,
        password:this.state.pwd,
        
      })
        .then(res => {
          this.setState({ loading: false });
  
          setTimeout(() => {
            this.setState({ redirect: "/DnDWeviooReact/main"});
          }, 1300);
  
        }).catch(error => {
          alert('erreur : ' + error)
        });
  
   
      }
  



  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">S'inscrire</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt=""  />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="nom">Nom<span >*</span></label>
              <input type="text" name="nom" placeholder="nom d'utilisateur"  onChange={(val) => this.setState({ nom: val.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom  <span >*</span></label>
              <input type="text" name="prenom" placeholder="prenom d'utilisateur"  onChange={(val) => this.setState({ prenom: val.target.value })}/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email  <span>*</span></label>
              <input type="text" name="email" placeholder="email" onChange={(val) => this.setState({ email: val.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe  <span >*</span></label>
              <input type="text" name="password" placeholder="mot de passe" onChange={(val) => this.setState({ pwd: val.target.value })} />
            </div>
            <div className="form-group">
           
          </div>
          </div>
        </div>
        <div className="footer">
      
         
          <button type="button" className="btn"   onClick={this.registration} >
          S'inscrire
          </button>
        </div>
        <Box mt={1}>
        <Copyright />
      </Box>
      </div>
    );
  }
}
