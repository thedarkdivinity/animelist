import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
const useStyles=makeStyles((theme)=>({
   container:{
       width:"90%",
       maxWidth:"1240px",
       
       overflow:"hidden"
   },
  flex:{
      display:"flex",
     
      alignItems:'center',
      flexDirection:"column"
  }
}))
const Profile = () => {
    const classes=useStyles();
    const { user }=useAuth0();
    
    return (
       <section className={classes.flex}>  
    
       <TopBar user={user}/> 
        
        
      
         </section>
    )
}

export default Profile;