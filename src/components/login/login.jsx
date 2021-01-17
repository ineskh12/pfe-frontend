import React from "react";
import loginImg from "./Wevioo.png";
import Link from '@material-ui/core/Link';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import { Redirect } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

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

export class Login extends React.Component {
  constructor(props) {

    super(props);
  this.state={redirect: null,email:null,pwd:null,login:false,store:null}
  this.seconnecter = this.seconnecter.bind(this);}
  seconnecter = () => {

    axios.post('http://localhost:3002/auth/login', {
   
      email:this.state.email,
      password:this.state.pwd,
      
    })
      .then((response) => {
        
        localStorage.setItem('login',JSON.stringify(
          response.data.token
        ))
          console.log("result",response.data.token);
       this.setState({ login: true });
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
        <div className="header">Se connecter</div>
        <div className="content">
          <div className="image">
          <img src={loginImg} alt="" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={(val) => this.setState({ email: val.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
             
              <input type="password" name="password" placeholder="mot de passe"  onChange={(val) => this.setState({ pwd: val.target.value })} />
            </div>
            <div className="form-group">
            <Link href="#" variant="body2">
          Mot de passe oublié?
              </Link></div>
          </div>

        
        </div>
        <div className="footer">
        <button type="button" className="btn"   onClick={()=>{this.seconnecter()}} >
          se connecter
          </button>
        
        </div>
        <Box mt={5}>
        <Copyright />
      </Box>
      </div>
    );
  }
}
