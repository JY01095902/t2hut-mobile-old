import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import BookIcon from '@material-ui/icons/Book';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    width: 120,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              T2Hut
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: 112 }}>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={16}>
                <Grid item>
                  <Fab color="primary" variant="extended" aria-label="照片库" className={classes.fab} style={{ backgroundColor: deepOrange[400] }}
                    onClick={() => { window.location = '/gallery/' }}>
                    <ImageIcon className={classes.extendedIcon} />
                    照片库
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab color="secondary" variant="extended" aria-label="便签" className={classes.fab} style={{ backgroundColor: cyan[500] }}
                    onClick={() => { window.location = '/note/' }}>
                    <BookIcon className={classes.extendedIcon} />
                    便签
                  </Fab>
                </Grid>
              </Grid>
              <Grid container justify="center" spacing={16}>
                <Grid item>
                  <Fab color="default" variant="extended" aria-label="关于" className={classes.fab} style={{ backgroundColor: green[400], color: "#fff" }}
                    onClick={() => { window.location = '/me/' }}>
                    <PersonIcon className={classes.extendedIcon} />
                    我的
                  </Fab>
                </Grid>
                <Grid item>
                  <Fab color="default" variant="extended" aria-label="关于" className={classes.fab} style={{ backgroundColor: pink[300], color: "#fff" }}
                    onClick={() => { window.location = '/about/' }}>
                    <HelpOutlineIcon className={classes.extendedIcon} />
                    关于
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home);;