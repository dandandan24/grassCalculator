import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const RollsTable = (props) => {
    return(
        <TableContainer component = {Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align = 'right'>רוחב : 2 מטרים</TableCell>
                        <TableCell align = 'right'>רוחב : 3 מטרים</TableCell>
                        <TableCell align = 'right'>רוחב : 4 מטרים</TableCell>
                        <TableCell align = 'right'>סה"כ פחת</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align = 'right'>{props.row ? props.row.TwoMeter : '0'}</TableCell>
                        <TableCell align = 'right'>{props.row ? props.row.ThreeMeter : '0'}</TableCell>
                        <TableCell align = 'right'>{props.row ? props.row.FourMeter : '0'}</TableCell>
                        <TableCell align = 'right'>{props.row ? props.row.LeftOvers : '0'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RollsTable