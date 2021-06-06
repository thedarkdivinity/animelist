import React, { useState } from 'react'
import { Button, ButtonGroup, makeStyles, Paper, Typography} from '@material-ui/core'
import LogoutButton from '../LogoutButton';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from 'react-avatar'

const useStyles=makeStyles((theme)=>({
   paper:{
       width:"80%",
       background:"pink",
       height:"32vh",
       minWidth:"200px"

   },
   photo:{
       width:"80px",
       height:"80px",
       borderRadius:"50%",
       [theme.breakpoints.down('sm')]:{
           marginTop:"4px"
       }
   },
   grid:{
       display:"grid",
       gridTemplateColumns:"repeat(2,1fr)",
       placeItems:"center",
       height:"100%",
       [theme.breakpoints.down('sm')]:{
        display:"grid",
        gridTemplateColumns:"1fr",
        placeItems:"center",
        height:"100%",
       }
   },
   marginTopOnMobile:{
       marginTop:"5px",
    [theme.breakpoints.down('sm')]:{
        marginTop:"15px"
    }
   }
}))
const TopBar = ({user}) => {
    const{currentUser,logout}=useAuth();
    const[error,setError]=useState('');
    const classes=useStyles();
    const history=useHistory();
   async function handleLogout(){
     setError('')
     try{
        await logout()
        history.push('/login')
     }catch{
         setError('Failed to logout')
     }
    }
    return (
       
      <Paper className={classes.paper}>
      <div className={classes.grid}>
      <Avatar name={user.email} size="80px" className={classes.photo}/>
      <div>
      <Typography variant="h5" component="h5" className={classes.marginTopOnMobile}
      style={{
          textAlign:"center"
      }}
      >{user.email}</Typography>
      <ButtonGroup  className={classes.marginTopOnMobile} style={{
          marginLeft:"auto",
          marginRight:"auto",
      }} variant="contained" color="secondary">
      <Button onClick={()=>history.push('/search')}> Search Anime</Button>
     
      <Button onClick={handleLogout}>Logout</Button>
      </ButtonGroup>
     
      </div>
      </div>
      </Paper>
    )
}

export default TopBar
