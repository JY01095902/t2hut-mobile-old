import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

class About extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton style={{ marginLeft: -12, marginRight: 20, }} color="inherit" aria-label="ArrowBack"
              onClick={() => { window.history.back() }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              About
                    </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 56 }}>
          <h3>About</h3>
        </div>
      </div>
    )
  }
}

export default About;