import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Container from '@material-ui/core/Container';
import Dashboard from "./Dashboard";
import Template from "../components/templates/Template";
import DashboardIcon from '@material-ui/icons/Dashboard';
import Drafts from "../components/templates/Drafts";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ListTemplate from '../components/templates/ListTemplate';
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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Dashboard")}
          >
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
        <ListItemText primary="Dashboard">{Dashboard}</ListItemText>
          </ListItem>
          
          <ListItem
            button
            component={Link}
            to="/template"
            onClick={onItemClick("Modèles")}
          >
              <ListItemIcon>
            <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Modèles">Modèles</ListItemText>
          </ListItem>
          
          <ListItem  button
            component={Link}
            to="/drafts" onClick={onItemClick("Brouillons")}>
              <ListItemIcon>
            <FileCopyIcon />
            </ListItemIcon>
        <ListItemText primary="Brouillons">Brouillons</ListItemText>
          </ListItem>

          <ListItem  button
            component={Link}
            to="/list" onClick={onItemClick("list")}>
              <ListItemIcon>
            <FileCopyIcon />
            </ListItemIcon>
        <ListItemText primary="list">list</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
    
        <Container maxWidth="lg" className={classes.container}>
        
        <Route exact path="/" component={Dashboard} />
        <Route path="/template" component={Template} />
        <Route path="/drafts" component={Drafts} />
        <Route path="/list" component={ListTemplate} />
        </Container>
      </main>
    </Router>
  )
);

function MainPage({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState();

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
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

export default withStyles(styles)(MainPage);
