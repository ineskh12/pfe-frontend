import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from "./Dashboard";
import Template from "../components/templates/Template";
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListTemplate from '../components/templates/ListTemplate';
import Detailstemplate from  '../components/templates/Detailstemplate';
import EditTemplate from '../components/templates/EditTemplate';
import Drafts from './templates/drafts';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const seDeconnecte=()=>{
  localStorage.clear();
  window.location.href = "/DnDWeviooReact/"

}
const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar color="default" className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
          <Button   color="inherit" variant="outlined" className={classes.link} 
        
          onClick={seDeconnecte}> <ExitToAppIcon/>  
            se déconnecter
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
    <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                  paper: classes.drawerPaper
                }}
               
    >
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === 'persistent'
        })}
      />
      <List>
        <ListItem button component={Link} to="/DnDWeviooReact/dashboard" onClick={onItemClick('Dashboard')}>
        <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
          <ListItemText  primary="Dashboard">Dashboard</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/DnDWeviooReact/template" onClick={onItemClick('Modéles')}>
        <ListItemIcon>
            <AddBoxIcon />
            </ListItemIcon>
          <ListItemText primary="Modéles" >Modéles</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/DnDWeviooReact/list" onClick={onItemClick('List')}>
        
        <ListItemIcon>
            <ViewListIcon />
            </ListItemIcon>
          <ListItemText primary="List">List</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/DnDWeviooReact/drafts" onClick={onItemClick('Brouillons')}>
        <ListItemIcon>
            <FileCopyIcon />
            </ListItemIcon>
          <ListItemText primary="Brouillons">   Brouillons </ListItemText>
        </ListItem>


        
        <ListItem button component={Link} to="/DnDWeviooReact/drafts" onClick={onItemClick('Brouillons2')}>
        <ListItemIcon>
            <PersonPinIcon />
            </ListItemIcon>
          <ListItemText primary="Brouillons2">   Brouillons2 </ListItemText>
        </ListItem>
      </List>
    </Drawer>
    <main className={classes.content}>
 
        <Route exact path="/DnDWeviooReact/dashboard" component={Dashboard} />
        <Route path="/DnDWeviooReact/template" component={Template} />
     
        <Route path="/DnDWeviooReact/list" component={ListTemplate} />
           <Route path="/DnDWeviooReact/drafts" component={Drafts} /> 
           <Route path="/DnDWeviooReact/edit" component={EditTemplate} />
           <Route path="/DnDWeviooReact/details" component={Detailstemplate} /> 
        
       
    </main>
    </Router>
  )
);


function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(true);


  const [title, setTitle] = useState(localStorage.getItem('firstname'));
 
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  
  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === 'temporary' ? true : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      
      <MyDrawer
      
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
   
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);
