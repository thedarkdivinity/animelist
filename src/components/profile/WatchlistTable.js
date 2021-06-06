import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import {db} from '../../firebase';

import {useAuth} from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
  table: {
    minWidth:120,
  },
  title:{
      textAlign:'center'
  }
});



export default function WatchlistTable({animes}) {
  const classes = useStyles();
  const {currentUser}=useAuth();
  const {uid}=currentUser;
 
console.log(animes)
const onDelete=(key)=>{
 db.child(`users/${uid}/watchlist/${key}`).remove(
   err=>toast.error(err)
 )
 toast.success('Successfully Removed from Watchlist')
}
  return (
      <section style={{
          width:"90%",
          maxWidth:'1240px',
          margin:"20px auto"

      }}>
      <ToastContainer/>
      <Typography variant="h5" component="h5"
      style={{
          textAlign:'center'
      }}
      >My Watchlist</Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Watchlist Table">
        <TableHead>
          <TableRow>
            <TableCell>Anime </TableCell>
            <TableCell align="right">Actions</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
        {
            Object.keys(animes).map(id=>{
              
                return (
                  
                    <TableRow key={id}>
                    <TableCell>{animes[id].title}
                    </TableCell>
                    <TableCell align="right">
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    endIcon={<Delete/>}
                    onClick={()=>onDelete(id)}
                    >Delete</Button>
                    </TableCell>
                    </TableRow>
                )
            })
           }
            
        
        </TableBody>
      </Table>
    </TableContainer>
    </section>
  );
}
