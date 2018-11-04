import React, { Component } from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import TextField from '@material-ui/core/TextField/TextField';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button/Button';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { gameCodeValid } from '../../util/validators';

class JoinDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open, loading: false, reason: undefined,
    };
  }

  componentDidMount() {
    let gameCode = localStorage.getItem('gameCode');
    if (gameCode === 'null') {
      gameCode = null;
    }

    let playerName = localStorage.getItem('playerName');
    if (playerName === 'null') {
      playerName = null;
    }

    this.setState({
      gameCode,
      playerName,
    });

    if (gameCodeValid(gameCode) && playerName) {
      this.runExtSubmit(gameCode, playerName);
    }
  }

  handleClose = async () => {
    const { gameCode, playerName } = this.state;

    this.runExtSubmit(gameCode, playerName);
  };

  onChange = fieldName => (event) => {
    const { onChange } = this.props;
    onChange(fieldName, event.target.value);
    this.setState({ [fieldName]: event.target.value });
  };

  handleCancel = (event) => {
    const { handleCancel } = this.props;
    const shouldClose = handleCancel(event.target.value);
    this.setState({ open: !shouldClose });
  };

  runExtSubmit(gameCode, playerName) {
    this.setState({ loading: true });
    const { onSubmit } = this.props;
    onSubmit(gameCode, playerName).then((errorMsg) => {
      this.setState({ loading: false });

      this.setState({ open: !!errorMsg, reason: errorMsg });
      if (!errorMsg) {
        localStorage.setItem('gameCode', gameCode);
        localStorage.setItem('playerName', playerName);
      }
    });
  }


  render() {
    const { classes } = this.props;
    const {
      open, loading, reason, playerName, gameCode,
    } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.dialogTitle}>Join game</DialogTitle>

        <div>
          <DialogContent>
            {loading
              ? <CircularProgress />
              : (
                <div>
                  {
                  reason && (
                  <DialogContentText color="error">
                    {reason}
                  </DialogContentText>
                  )
                }
                  <DialogContentText>
                Enter your preferred player name and the key to the game you want to join.
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    label="Player name"
                    type="text"
                    value={playerName}
                    onChange={this.onChange('playerName')}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Game key"
                    type="text"
                    value={gameCode}
                    onChange={this.onChange('gameCode')}
                    fullWidth
                  />
                </div>
              )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
                Join game
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  }
}

const styles = {
  dialogTitle: {
    padding: 0,
  },
};

JoinDialog.propTypes = {
  // classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

JoinDialog.defaultProps = {
  onChange: () => {},
  handleCancel: () => true,
  open: false,
};

export default withStyles(styles)(JoinDialog);
