import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';

const Intro = ({ classes }) => (
  <div>
    <Typography variant="h6">What this app is</Typography>
    <Typography>This app is a level counter for Munchkin.</Typography>
    <Typography variant="h6">How to use it</Typography>
    <Typography>If you want to create a match click the button on the AppBar above</Typography>
    <Typography>If you want to create a match click the button on the AppBar above</Typography>
  </div>
);

Intro.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {};

export default withStyles(styles)(Intro);
