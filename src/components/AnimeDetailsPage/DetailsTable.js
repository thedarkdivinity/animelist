import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CurrentAnimeContext } from '../../context/CurrentAnimeContext';

const useStyles = makeStyles({
  table: {
    minWidth: 120,
    height:"100%"
   
  },
});



export default function DetailsTable() {
  const {currentAnime}=useContext(CurrentAnimeContext)
console.log(currentAnime)
  const classes = useStyles();
  const {title,episodes,rating,status}=currentAnime
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h3>Value</h3></TableCell>
            <TableCell align="right"><h3>details</h3></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow>
              <TableCell component="th" scope="row">
                Title
              </TableCell>
              <TableCell align="right">{title}</TableCell>
              
            </TableRow>
            {episodes &&<TableRow>
            <TableCell component="th" scope="row">
              Episodes
            </TableCell>
            <TableCell align="right">{episodes}</TableCell>
            
          </TableRow>}
          {rating && <TableRow>
            <TableCell component="th" scope="row">
              Rating
            </TableCell>
            <TableCell align="right">{rating}</TableCell>
            
          </TableRow>}
          {status && <TableRow>
            <TableCell component="th" scope="row">
              Status
            </TableCell>
            <TableCell align="right">{status}</TableCell>
            
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
