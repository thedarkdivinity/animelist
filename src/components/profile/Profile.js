import React,{useState,useEffect} from 'react'

import { makeStyles} from '@material-ui/core';
import TopBar from './TopBar';
import { db } from '../../firebase';
import WatchlistTable from './WatchlistTable';
import { useAuth } from '../../context/AuthContext';

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
    const[error,setError]=useState('');
    const { currentUser }=useAuth();
    const{uid}=currentUser;
    useEffect(()=>{
        db.child(`users/${uid}/watchlist`).on('value',snapshot=>{
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
      
       <TopBar user={currentUser} /> 
      {
          
      }
       {watchlistObjects && <WatchlistTable animes={watchlistObjects}/> }
        
      
         </section>
    )
}

export default Profile;