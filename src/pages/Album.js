import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
// import tileData from './tileData';
import { fetchCatalog, uploadPicture } from '../services/bodleian/catalogService';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// const serviceRoot = 'http://10.202.101.62:17175'
const serviceRoot = 'https://www.t2hut.com'

const styles = theme => ({
  addPictureButton: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  paper: {
      display: 'flex',
      // justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing.unit / 2,
  },
  chip: {
      margin: theme.spacing.unit / 2,
  },
});

class Album extends Component {
  state = {
    showImageView: false,
    image: {},
    pictures: [],
    traceMap: [],
    folders: [],
    currentFolderPath: null,
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

  handleDeleteTrace = trace => () => {
    const i = this.state.traceMap.indexOf(trace);

    console.log(i)
    const newTraceMap = this.state.traceMap.slice(0, i)
    console.log(newTraceMap)
    this.setState({ traceMap: newTraceMap })
    let url = serviceRoot + '/bodleian/catalog'
    if (newTraceMap.length > 0) {
      const currentTrace = newTraceMap[newTraceMap.length - 1]
      url = currentTrace.url
    }
    this.getCatalog(url)
  };

  getCatalog = (url) => {
    fetchCatalog(url)
      .then(res => {
        console.log(res)
        this.setState({ 
          pictures: res.data.pictures,
          folders: res.data.folders,
        });
      })
      .catch(err => {
        // this.setState({ animating: false });
        // Toast.fail('获取入库Code失败，请刷新页面重试')
      })
  }

  handleClickFolder = folder => () => {
    let traceMap = this.state.traceMap
    traceMap.push({name: folder.name, url: folder.url})
    this.setState({traceMap: traceMap, currentFolderPath: folder.path})
    this.getCatalog(folder.url)
  };
  
  handleSelectPicture = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const path = this.state.currentFolderPath ? this.state.currentFolderPath : "/"
    const picture_url =  serviceRoot + '/bodleian/pictures?path=' + path
    let formData = new FormData()
    formData.append("image_file", file)
    uploadPicture(picture_url, formData)
      .then(data => {
        let pictures = this.state.pictures
        pictures.push(data.data)
        console.log(pictures)
        this.setState({pictures: pictures})
        document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
      })
  }

  componentDidMount() {
    const url =  serviceRoot + '/bodleian/catalog'
    this.getCatalog(url)
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{
        marginTop: 56,
      }}>
        <div>
            <Paper className={classes.paper}><Typography>足迹</Typography>
                {this.state.traceMap.map(trace => {
                    return (
                        <Chip
                        key={trace.name}
                        label={trace.name}
                        onDelete={this.handleDeleteTrace(trace)}
                        className={classes.chip}
                        />
                    );
                })}
            </Paper>
            <Paper className={classes.paper}><Typography>目录</Typography>
                {this.state.folders.map(folder => {
                    return (
                        <Chip
                        key={folder.name}
                        label={folder.name}
                        onClick={this.handleClickFolder(folder)}
                        className={classes.chip}
                        />
                    );
                })}
            </Paper>
        </div>
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
          }} >
          <GridList cellHeight={160}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>
            {this.state.pictures.map(picture => (
              <GridListTile key={picture.name}>
                <img src={picture.thumbnail_url} alt={picture.name} 
                onClick={() => {this.handleClickImage(picture.url, picture.name)}}
                />
              </GridListTile>
            ))}
          </GridList>
          <Dialog
            fullScreen
            open={this.state.showImageView}
            onClose={this.handleCloseImageView}
          >
            <AppBar position="fixed" color="default">
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleCloseImageView} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                  {this.state.image.title}
                </Typography>
              </Toolbar>
            </AppBar>
            <div style={{ marginTop: 56 }}>
              <img src={this.state.image.src} alt={this.state.image.title} style={{height: 'auto', width: '100%'}}/>
            </div>
          </Dialog>
        </div>
        <input type="file" accept=".jpeg,.jpg,.png" style={{display: 'none'}}
          onChange={(event) => this.handleSelectPicture(event)} ref="pictureUploadInput" />
        <Fab color="primary" aria-label="Add" className={classes.addPictureButton}
          onClick={() => {
            this.refs.pictureUploadInput.click();
          }}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Album);
