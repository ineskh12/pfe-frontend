import React from "react";
import loginImg from "./Wevioo.png";
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';
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
//let history = useHistory();


export class Register extends React.Component {
 
 /*  constructor(props) {
    super(props);
   
  } */

  

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">S'inscrire</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt=""  />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur <span className="mandatory">*</span></label>
              <input type="text" name="username" placeholder="nom d'utilisateur" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email  <span className="mandatory">*</span></label>
              <input type="text" name="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe  <span >*</span></label>
              <input type="text" name="password" placeholder="mot de passe" />
            </div>
            <div className="form-group">
            <Link   href="#" variant="body2">
            Vous avez déjà un compte? se connecter
              </Link></div>
          </div>
        </div>
        <div className="footer">
      
          <button type="button" className="btn">
          <a href="https://ineskh12.github.io/DnDWeviooReact/main" style={{color: 'white'}}> S'inscrire</a>
         
          </button>
        </div>
        <Box mt={1}>
        <Copyright />
      </Box>
      </div>
    );
  }
}
