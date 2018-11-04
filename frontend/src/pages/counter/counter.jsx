import React, { Component } from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
// import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import { Button } from '@material-ui/core';
import MatchOverview from './match-overview';

import JoinDialog from './join-dialog';
import { gameCodeValid, playerNameValid } from '../../util/validators';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { conn: null };
  }

  componentWillUnmount() {
    const { conn } = this.state;
    if (conn) {
      conn.close();
      console.log('left game');
    }
  }

  async joinGame(gameCode, playerName) {
    if (!gameCodeValid(gameCode)) {
      return 'Invalid game code';
    }

    if (!playerNameValid(playerName)) {
      return 'Invalid player name';
    }

    console.log(`joining game ${gameCode} with playername ${playerName}`);
    let { conn } = this.state;

    if (window.WebSocket) {
      conn = new WebSocket('ws://localhost:8080/ws');
      conn.onopen = () => this.setState({ conn });
      conn.onerror = () => '';
      conn.onclose = () => this.setState({ conn: null });
      conn.onmessage = (evt) => {
        try {
          this.setState({ match: JSON.parse(evt.data) });
        } catch (e) {
          console.error(e);
        }
      };

      return false; // return false for no error
    }

    return 'no browser supporterino for websockets';
  }


  render() {
    // const { classes } = this.props;
    const {
      conn, match, playerName, gameCode,
    } = this.state;
    return (
      <div>
        <Typography>
          Game-code:
          {gameCode}
          {' '}
& player-name:
          {' '}
          {playerName}
        </Typography>
        {!conn
          ? ([
            <Typography key="disconnected">
            Disconnected!
            </Typography>,
            <Button key="reconnect">Connect</Button>,
          ]
          )
          : (
            <MatchOverview match={match} playerName={playerName} />
          )}
        <JoinDialog
          onSubmit={(_gameCode, _playerName) => {
            this.setState({ gameCode: _gameCode, playerName: _playerName });
            return this.joinGame(_gameCode, _playerName);
          }}
          open
        />
      </div>
    );
  }
}

const styles = () => ({});

Counter.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Counter);
