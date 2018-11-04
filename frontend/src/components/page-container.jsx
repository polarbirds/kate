import React from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';

const PageContainer = ({
  classes, title, Component, componentProps,
}) => ([
  <Typography className={classes.title} key={title} variant="h6">{title}</Typography>,
  <Paper key={Component.toString()} className={classes.root} square>
    <Component {...componentProps} />
  </Paper>,
]);

const styles = theme => ({
  title: {
    marginTop: '0.5rem',
    marginLeft: '1rem',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '1rem',
  },
});

PageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageContainer);
