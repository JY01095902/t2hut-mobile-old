import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
        marginTop: 56,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


const folders = [
    {name: 'A', folders: [{name:'a1', folders: [{name:'a1-1', folders:[]}]}]},
    {name: 'B', folders: [{name:'b1', folders: [{name:'b1-1', folders:[]}, {name:'b1-2', folders:[]}]}]},
    {name: 'C', folders: [{name:'c1', folders: [{name:'c1-1', folders:[]},]}, {name:'c2', folders: [{name:'c2-1', folders:[]},]}]},
    {name: 'D', folders: [{name:'d1', folders: [{name:'d1-1', folders:[]},]}, {name:'d2', folders: [{name:'d2-1', folders:[]},{name:'d2-2', folders:[{name:'d2-2-1', folders:[]}]}]}]},
]
class Me extends Component {
    state = {
        pathData: [
        //   { key: 0, name: 'Angular' },
        //   { key: 1, name: 'jQuery' },
        //   { key: 2, name: 'Polymer' },
        //   { key: 3, name: 'React' },
        //   { key: 4, name: 'Vue.js' },
        ],
        folderData: folders
    };

    handleDelete = data => () => {
        const i = this.state.pathData.indexOf(data);
        const newPathData = this.state.pathData.slice(0, i)
        const currentIndex = newPathData.length - 1 < 0 ? 0 : newPathData.length - 1
        console.log(newPathData[currentIndex])
        const newFolderData = newPathData.length - 1 < 0 ? folders : newPathData[currentIndex].folders
        console.log(newFolderData)
        this.setState({folderData: newFolderData, pathData: newPathData})
        // this.setState(state => {
        //   const pathData = [...state.pathData];
        //   const chipToDelete = pathData.indexOf(data);
        //   pathData.splice(chipToDelete, 1);
        //   return { pathData };
        // });
    };

    handleFolderClick = data => () => {
        if (data.folders.length === 0) {
            return
        }
        // console.log({key: this.state.pathData.length, name: data.name})
        let newPathData = this.state.pathData
        newPathData.push({key: this.state.pathData.length, name: data.name, folders: data.folders})

        this.setState({folderData: data.folders, pathData: newPathData})
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
              <AppBar position="fixed" color="default">
                  <Toolbar>
                    <IconButton style={{ marginLeft: -12, marginRight: 20, }} color="inherit" aria-label="ArrowBack"
                        onClick={() => {window.history.back()}}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Me
                    </Typography>
                  </Toolbar>
              </AppBar>
                <Paper className={classes.root}>
                    {this.state.pathData.map(data => {
                        return (
                            <Chip
                            key={data.key}
                            label={data.name}
                            onDelete={this.handleDelete(data)}
                            className={classes.chip}
                            />
                        );
                    })}
                </Paper>
                <Paper className={classes.root}>
                    {this.state.folderData.map(data => {
                        return (
                            <Chip
                            key={data.name}
                            label={data.name}
                            onClick={this.handleFolderClick(data)}
                            className={classes.chip}
                            />
                        );
                    })}
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Me);