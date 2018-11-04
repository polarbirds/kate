import React from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import PropTypes from 'prop-types';

const MatchOverview = ({ classes, match, playerName }) => (
  <div>
    them:
    {
      match.players && Object.keys(match.players)
        .filter(name => name !== playerName)
        .map(name => match.players[name])
        .map(player => JSON.stringify(player))
    }
    you:
    {
      match.players && match.players[playerName] && JSON.stringify(match.players[playerName])
    }
  </div>
);

// const OtherPlayer = player => (
//   <div>{player}</div>
// );

const styles = () => ({});

MatchOverview.propTypes = {
  classes: PropTypes.object.isRequired,
  playerName: PropTypes.string.isRequired,
  match: PropTypes.object,
};

MatchOverview.defaultProps = {
  match: {},
};

export default withStyles(styles)(MatchOverview);
