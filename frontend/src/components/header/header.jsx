import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
  }

  createMatch =() => {
    fetch('http://localhost:8080/create-match')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((json) => {
        const gameCode = json.GameCode;
        localStorage.setItem('gameCode', gameCode);
      });
  };

  render() {
    const { classes } = this.props;
    const { drawerOpen } = this.state;

    return [
      <Sidebar
        key="sidebar"
        open={drawerOpen}
        onClick={() => this.setState({ drawerOpen: false })}
      />,
      <AppBar position="static" key="headerbar">
        <Toolbar>
          <IconButton
            onClick={() => this.setState({ drawerOpen: true })}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Kate
          </Typography>
          <Button color="inherit" onClick={this.createMatch}>Create match</Button>
          <img alt="logo" className={classes.logo} src="/kate.svg" />
        </Toolbar>
      </AppBar>,
    ];
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '1.5rem',
    marginLeft: '1rem',
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
