import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import tileData from './tileData';

class Album extends Component {
  state = {
    showImageView: false,
    image: {},
  };
  handleClickImage = (src, title) => {
    this.setState({ 
      showImageView: true,
      image: {
        src: src,
        title: title
      }
    });
  };
  handleCloseImageView = () => {
    this.setState({ showImageView: false, image: {} });
  };
  render() {
    return (
      <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          marginTop: 56,
        }}>
        <GridList cellHeight={160}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {tileData.map(tile => (
            <GridListTile key={tile.thumbnail}>
              <img src={tile.thumbnail} alt={tile.title} 
              onClick={() => {this.handleClickImage(tile.img, tile.title)}}
              />
            </GridListTile>
          ))}
        </GridList>
        <Dialog
          fullScreen
          open={this.state.showImageView}
          onClose={this.handleCloseImageView}
        >
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleCloseImageView} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                {this.state.image.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <img src={this.state.image.src} alt={this.state.image.title} style={{height: 'auto', width: '100%'}}/>
        </Dialog>
      </div>
    );
  }
}

export default Album;
