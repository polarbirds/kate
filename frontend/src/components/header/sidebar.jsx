import React from 'react';
import withStyles from '@material-ui/core/es/styles/withStyles';
import Drawer from '@material-ui/core/Drawer/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { gameCodeValid } from '../../util/validators';

const Sidebar = ({ open, onClick }) => {
  const gameCode = localStorage.getItem('gameCode');
  return (
    <Drawer elevation={20} open={open} onClose={onClick}>
      <div
        tabIndex={0}
        role="button"
        onClick={onClick}
        onClose={onClick}
        onKeyDown={onClick}
      >
        <List>
          {[{
            text: 'Intro',
            location: '/',
            Icon: DeleteIcon,
          }, {
            text: 'Match',
            location: '/match',
            Icon: DeleteIcon,
          }, {
            text: 'Create Match',
            location: '/create-match',
            Icon: DeleteIcon,
          }, {
            text: 'Stats',
            location: '/stats',
            Icon: DeleteIcon,
          }].map(({ text, location, Icon }) => (
            <Link to={location} key={text}>
              <ListItem button>
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
          {gameCodeValid(gameCode) && (
          <ListItem button onClick={() => localStorage.setItem('gameCode', null)}>
            <ListItemText>
              Disband match
              {' '}
              {gameCode}
            </ListItemText>
          </ListItem>
          )
}
        </List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = {};

export default withStyles(styles)(Sidebar);
