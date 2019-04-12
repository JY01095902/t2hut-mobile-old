import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NotePage from './pages/Note';
import AlbumPage from './pages/Album';
import MePage from './pages/Me';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <IconButton style={{ marginLeft: -12, marginRight: 20, }} color="inherit" aria-label="ArrowBack"
              onClick={() => {window.history.back()}}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              T2Hut
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 56,}}>
          <Router>
              <Route path="/" exact component={HomePage} />
              <Route path="/about/" component={AboutPage} />
              <Route path="/note/" component={NotePage} />
              <Route path="/album/" component={AlbumPage} />
              <Route path="/me/" component={MePage} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
