import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
// import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
// import tileData from './tileData';
import { fetchCatalog, uploadPicture, deletePicture } from '../services/bodleian/catalogService';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import { object } from 'prop-types';

// const serviceRoot = 'http://10.202.101.62:17175'
const serviceRoot = 'https://www.t2hut.com'
// const serviceRoot = 'http://192.168.1.11:17175'

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
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    top: '30%',
    left: '30%',
  },
});

class Album extends Component {
  state = {
    showImageView: false,
    image: {},
    pictures: [],
    uploadingPictures: [],
    traceMap: [],
    folders: [],
    currentFolderPath: null,
    loading: false,
    editMode: false,
    deletePictureNames: []
  };
  handleClickImage = (src, thumbnailSrc, title) => {
    this.setState({ 
      showImageView: true,
      image: {
        src: thumbnailSrc,
        title: title,
        originSrc: src,
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
  
  handleSelectPicture = async (event) => {
    if (event.target.files.length > 6) {
      alert("最多选择6张图片")
      return
    }
    function guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
      });
    }
    function readFiles() {
      let pictures = []
      for (const file of event.target.files) {
        console.log(file)

        let formData = new FormData()
        formData.append("image_file", file)
        const picture = {
          name: `${guid()}-${file.name}`,
          path: null,
          thumbnail_path: null,
          url: null,
          thumbnail_url: null,
          src: window.URL.createObjectURL(file),
          formData: formData,
        }

        console.log(picture)
        pictures.push(picture)
      }
      return pictures
    };
    const uploadingPictures = await readFiles()

    const addUploadingPictures = (pictures) => {
      let uploadingPictures = this.state.uploadingPictures
      uploadingPictures.push(...pictures)
      this.setState({uploadingPictures: uploadingPictures})
    }
    await addUploadingPictures(uploadingPictures)
    document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;

    for (const uploadingPicture of uploadingPictures) {

      const path = this.state.currentFolderPath ? this.state.currentFolderPath : "/"
      const picture_url =  serviceRoot + '/bodleian/pictures?path=' + path
      uploadPicture(picture_url, uploadingPicture.formData)
        .then(data => {
          console.log("new picture", data)
          const i = this.state.uploadingPictures.indexOf(uploadingPicture);
          const newUploadingPictures = this.state.uploadingPictures.slice(0, i)
          this.setState({uploadingPictures: newUploadingPictures})

          let pictures = this.state.pictures
          pictures.push(data.data)
          console.log(pictures)
          this.setState({pictures: pictures})
        })
    }
  }

  handleCheckPictureButtonChange = (pictureName, event) => {
    const checked = event.target.checked
    let deletePictureNames = this.state.deletePictureNames
    const i = deletePictureNames.indexOf(pictureName);
    if (checked && i < 0) {
      deletePictureNames.push(pictureName)
      this.setState({deletePictureNames: deletePictureNames})
    }

    if (!checked && i >= 0) {
      const newDeletePictureNames = this.state.deletePictureNames.slice(0, i)
      this.setState({deletePictureNames: newDeletePictureNames})
    }
  }
  handleDeletePictures = async () => {
    if (!this.state.deletePictureNames) return
    console.log(this.state.deletePictureNames)

    const path = this.state.currentFolderPath ? this.state.currentFolderPath : "/"
    const picture_url =  serviceRoot + '/bodleian/pictures?path=' + path
    for (const pictureName of this.state.deletePictureNames) {
      deletePicture(picture_url, pictureName)
          .then(data => {
            const i = this.state.deletePictureNames.indexOf(pictureName);
            const newDeletePictureNames= this.state.deletePictureNames.slice(0, i)
           
            const newPictures = []
            for(let i = 0; i < this.state.pictures.length; i++) {
              const picture = this.state.pictures[i]
              if(picture.name !== pictureName) {
                newPictures.push(picture)
              }
            }

            this.setState({
              pictures: newPictures,
              deletePictureNames: newDeletePictureNames,
              editMode: false
            })
          })
    }
  }

  componentDidMount() {
    const url =  serviceRoot + '/bodleian/catalog'
    this.getCatalog(url)
  };
  render() {
    const { classes } = this.props;
    const pictures = this.state.pictures.concat(this.state.uploadingPictures)
    return (
        <div>
          <AppBar position="fixed" color="default">
            <Toolbar>
              <IconButton style={{ marginLeft: -12, marginRight: 20, }} color="inherit" aria-label="ArrowBack"
                onClick={() => {window.history.back()}}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                Album
              </Typography>
              <Button color="inherit" style={{display: this.state.editMode? 'none' : 'flex',}}
                onClick={() => {
                  this.setState({ 
                    editMode: true
                  });
                }}>编辑
              </Button>
              <Button color="inherit" style={{display: this.state.editMode? 'flex' : 'none',}}
                onClick={() => {
                    this.setState({
                      editMode: false,
                      deletePictureNames: []
                    })
                  }}>取消</Button>
              <Button color="inherit" style={{display: this.state.editMode? 'flex' : 'none',}}
                onClick={this.handleDeletePictures}>删除</Button>
            </Toolbar>
          </AppBar>
          <div style={{
            marginTop: 56,
          }}>
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
              <ListSubheader component="div">图片列表</ListSubheader>
            </GridListTile>
            {pictures.map(picture => {
                if (picture.thumbnail_url) {
                  return (
                    <GridListTile key={picture.name}>
                      <img src={picture.thumbnail_url} alt={picture.name} 
                        onClick={() => {this.handleClickImage(picture.url, picture.thumbnail_url, picture.name)}}
                      />
                      <GridListTileBar
                        titlePosition="top"
                        actionPosition="right"
                        actionIcon={
                          <IconButton style={{color: 'white'}}>
                            <Checkbox style={{color: 'white', '&$checked': {color: 'white'}}} 
                              onChange={(event) => this.handleCheckPictureButtonChange(picture.name, event)}/>
                          </IconButton>
                        }
                        style = {{
                          display: this.state.editMode? 'flex' : 'none',
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                        }}
                      />
                    </GridListTile>
                  )
                }
                else{
                  return (
                    <GridListTile key={picture.name}>
                      <img src={picture.src} alt={picture.name} />
                      <CircularProgress className={classes.progress} />
                    </GridListTile>
                  )
                }
            })}
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
                <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                  {/* {this.state.image.title} */} 
                </Typography>
                <Button color="inherit" onClick={() => {
                  if (this.state.image.src === this.state.image.originSrc) {
                    return
                  }
                  this.setState({ 
                    image: Object.assign({}, this.state.image, {
                      src: this.state.image.originSrc,
                    }),
                    loading: true
                  });
                }}>查看原图</Button>
              </Toolbar>
            </AppBar>
            <div style={{ marginTop: 56 }}>
              <img src={this.state.image.src} alt={this.state.image.title} style={{height: 'auto', width: '100%'}} 
                onLoad={()=> {
                  this.setState({loading: false})
                }}/>
                 <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={this.state.loading}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">加载中...</span>}
                />
            </div>
          </Dialog>
        </div>
        <input type="file" accept=".jpeg,.jpg,.png" style={{display: 'none'}} multiple="multiple"
          onChange={(event) => this.handleSelectPicture(event)} ref="pictureUploadInput" />
        <Fab color="primary" aria-label="Add" className={classes.addPictureButton}
          onClick={() => {
            this.refs.pictureUploadInput.value = "";
            this.refs.pictureUploadInput.click();
          }}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(Album);
