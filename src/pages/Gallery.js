import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Image as ImageIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton style={{ marginLeft: -12, marginRight: 20, }} color="inherit" aria-label="ArrowBack"
              onClick={() => { window.history.back() }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Gallery
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 56 }}>
          <List className={classes.root}>
            <ListItem onClick={() => { window.location = '/album?prefix=shiyanxun/' }}>
              <Avatar>
                <ImageIcon />
              </Avatar>
              <ListItemText primary="我上传的全部" secondary="1123" />
              <ChevronRightIcon />
            </ListItem>
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(About);