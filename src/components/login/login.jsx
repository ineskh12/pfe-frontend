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
export class Login extends React.Component {
 /*  constructor(props) {
    super(props);
  }
 */
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Se connecter</div>
        <div className="content">
          <div className="image">
          <img src={loginImg} alt="" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input type="text" name="username" placeholder="nom d'utilisateur" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
             
              <input type="password" name="password" placeholder="mot de passe" />
            </div>
            <div className="form-group">
            <Link href="#" variant="body2">
          Mot de passe oublié?
              </Link></div>
          </div>

        
        </div>
        <div className="footer">
          
          <button type="button" className="btn">
          <a href="https://ineskh12.github.io/DnDWeviooReact/main"  style={{color: 'white'}}> se connecter</a>
          </button>
        
        </div>
        <Box mt={5}>
        <Copyright />
      </Box>
      </div>
    );
  }
}
