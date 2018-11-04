import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';

const Header = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
        <MenuIcon/>
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        Kate
      </Typography>
      <Button color="inherit">Create match</Button>
    </Toolbar>
  </AppBar>
);

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(Header);
