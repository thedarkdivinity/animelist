import React,{useState,useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import firebaseDb from '../../firebase';
import WatchlistTable from './WatchlistTable';

const useStyles=makeStyles((theme)=>({
   container:{
       width:"90%",
       maxWidth:"1240px",
       
       overflow:"hidden"
   },
  flex:{
      display:"grid",
     
    placeItems:'center'
  }
}))
const Profile = () => {
    const [watchlistObjects,setWatchlistObjects]=useState({});
    const classes=useStyles();
    
    const { user }=useAuth0();
    const{sub}=user;
    useEffect(()=>{
        firebaseDb.child(`users/${sub}/watchlist`).on('value',snapshot=>{
            if(snapshot.val()!=null)
            {
                setWatchlistObjects({
                    ...snapshot.val()
                })
            }
            
            
        }
        
        )
    },[])
    return (
       <section className={classes.flex}>  
      
       <TopBar user={user}/> 
        <WatchlistTable animes={watchlistObjects}/>
        
      
         </section>
    )
}

export default Profile;