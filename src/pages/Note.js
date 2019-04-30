import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        marginTop: 56
    },
    table: {
        // minWidth: 700,
    },
});

let id = 0;
function createData(account, shiyanxun, hongyu) {
  id += 1;
  return { id, account, shiyanxun, hongyu };
}

const rows = [
  createData('建设银行', 1000, 1000 ),
  createData('中国银行', 5000, 4000 ),
  createData('交通银行', 1120, 880),
  createData('招商银行', 840, 660),
  createData('中信银行', 840, 660),
];

class Note extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>账户</TableCell>
                        <TableCell align="right">史妍珣</TableCell>
                        <TableCell align="right">洪煜</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.account}
                        </TableCell>
                        <TableCell align="right">{row.shiyanxun}</TableCell>
                        <TableCell align="right">{row.hongyu}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(Note);