import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import tileData from './tileData';

class App extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
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
              <GridListTile key={tile.img}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default App;
