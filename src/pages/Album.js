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
import { fetchMediums, saveMedium, deleteMedium } from '../services/bodleian/catalogService';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const prefix = 'shiyanxun/'
const marker = null

const styles = theme => ({
  addPictureButton: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
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
    savingMediums: [],
    currentFolderPath: null,
    loading: false,
    editMode: false,
    deleteMediums: [],
    mediums: []
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

  getMediums = (prefix, marker) => {
    this.setState({loading: true})
    fetchMediums(prefix, marker)
      .then(res => {
        this.setState({ 
          loading: false,
          mediums: res.data.items,
        });
      })
      .catch(err => {
        this.setState({loading: false})
        alert(err)
      })
  }

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
          identifier: `${guid()}-${file.name}`,
          url: null,
          thumbnail_url: null,
          type: file.name.toLowerCase().split('.')[1],
          src: window.URL.createObjectURL(file),
          formData: formData,
        }

        console.log(picture)
        pictures.push(picture)
      }
      return pictures
    };
    const savingMediums = await readFiles()

    const addSavingMediums = (pictures) => {
      let savingMediums = this.state.savingMediums
      savingMediums.push(...pictures)
      this.setState({savingMediums: savingMediums})
    }
    await addSavingMediums(savingMediums)
    document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;

    for (const savingMedium of savingMediums) {
      saveMedium(prefix, savingMedium.formData)
        .then(data => {
          console.log("new picture", data)
          const i = this.state.savingMediums.indexOf(savingMedium);
          const newSavingMediums = this.state.savingMediums.slice(0, i)
          this.setState({savingMediums: newSavingMediums})

          let mediums = this.state.mediums
          mediums.push(data.data)
          console.log(mediums)
          this.setState({mediums: mediums})
        })
    }
  }

  handleCheckPictureButtonChange = (medium, event) => {
    const checked = event.target.checked
    let deleteMediums = this.state.deleteMediums
    const i = deleteMediums.indexOf(medium);
    if (checked && i < 0) {
      deleteMediums.push(medium)
      this.setState({deleteMediums: deleteMediums})
    }

    if (!checked && i >= 0) {
      const newDeleteMediums = this.state.deleteMediums.slice(0, i)
      this.setState({deleteMediums: newDeleteMediums})
    }
  }
  handleDeletePictures = async () => {
    if (!this.state.deleteMediums) return
    console.log(this.state.deleteMediums)
    for (const medium of this.state.deleteMediums) {
      deleteMedium(prefix, medium.identifier, medium.type)
          .then(data => {
            const i = this.state.deleteMediums.indexOf(medium);
            const newDeleteMediums= this.state.deleteMediums.slice(0,i).concat(this.state.deleteMediums.slice(i + 1,  this.state.deleteMediums.length))
           
            const newMediums = []
            for(let i = 0; i < this.state.mediums.length; i++) {
              const item = this.state.mediums[i]
              if(item.identifier !== medium.identifier) {
                newMediums.push(item)
              }
            }

            this.setState({
              mediums: newMediums,
              deleteMediums: newDeleteMediums,
              editMode: false
            })
          })
    }
  }

  componentDidMount() {
    this.getMediums(prefix, marker)
  };
  render() {
    const { classes } = this.props;
    const pictures = this.state.mediums.concat(this.state.savingMediums)

    console.log('location', this.props.location)
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
                      deleteMediums: []
                    })
                  }}>取消</Button>
              <Button color="inherit" style={{display: this.state.editMode? 'flex' : 'none',}}
                onClick={this.handleDeletePictures}>删除</Button>
            </Toolbar>
          </AppBar>
          <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              overflow: 'hidden',
              marginTop: 56,
            }} >
            <GridList cellHeight={160}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">图片列表</ListSubheader>
              </GridListTile>
              {pictures.map(picture => {
                  if (picture.thumbnail_url) {
                    return (
                      <GridListTile key={picture.identifier}>
                        <img src={picture.thumbnail_url} alt={picture.identifier} 
                          onClick={() => {
                            this.handleClickImage(picture.url, picture.thumbnail_url, picture.identifier)
                          }}
                        />
                        <GridListTileBar
                          titlePosition="top"
                          actionPosition="right"
                          actionIcon={
                            <IconButton style={{color: 'white'}}>
                              <Checkbox style={{color: 'white', '&$checked': {color: 'white'}}} 
                                onChange={(event) => {
                                  this.handleCheckPictureButtonChange(picture, event)
                                }}/>
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
                      <GridListTile key={picture.identifier}>
                        <img src={picture.src} alt={picture.identifier} />
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
