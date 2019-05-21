import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import NotePage from './pages/Note';
import GalleryPage from './pages/Gallery';
import AlbumPage from './pages/Album';
import MePage from './pages/Me';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/about/" component={AboutPage} />
        <Route path="/note/" component={NotePage} />
        <Route path="/gallery/" component={GalleryPage} />
        <Route path="/album/" component={AlbumPage} />
        <Route path="/me/" component={MePage} />
      </Router>
    );
  }
}

export default App;