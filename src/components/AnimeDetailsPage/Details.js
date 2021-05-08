import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button, CssBaseline, makeStyles } from '@material-ui/core';
import axios from 'axios';
import Loading from '../Loading';
import firebaseDb from '../../firebase'
import { useAuth0} from '@auth0/auth0-react'
const useStyles=makeStyles((theme)=>({
    mainSection:{
        height:'100vh',
        width:'100%',
        display:'grid',
        placeItems:'center'
    },
    grid:{
        display:'grid',
        gridTemplateColumns:'repeat(2,1fr)',
        width:'100vw',
        gridGap:'0px',
        [theme.breakpoints.down('xs')]:{
            gridTemplateColumns:'1fr',
        }
       
       
    },
    images:{
        
        borderRadius:'20px',
      
        display: "block",
        width: "60%",
        height:"auto"
    },
    container:{
        width:"90%",
        maxWidth:"1240px",
        margin:"0px auto",
        overflow:"none",
    }
}))
const Details = () => {
    const { user}=useAuth0();
    const {sub}=user;
    console.log(user.sub)
const[currentAnime,setCurrentAnime]=useState({});
const[loading,setLoading]=useState(false);
   const classes=useStyles();
    const {mal_id}=useParams();
   useEffect(()=>{
    const getAnimeDetails=async()=>{
        try {
            setLoading(true);
            const data=await axios.get(`https://api.jikan.moe/v3/anime/${mal_id}`);
           
            setCurrentAnime(data.data);
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    }
    getAnimeDetails();

   },[])
   const AddToWatchlist=(obj)=>{
    firebaseDb.child('watchlist').push(obj,
        err=>{
            if(err)
            {
                console.log(err);
            }
        }
        )
   }
return(
    <section className={classes.mainSection}>
  <CssBaseline/>
  <section className={classes.container}>
 {loading?<Loading/>:<section className={classes.grid}>
 <div>
 <img src={currentAnime.image_url} className={classes.images} alt={currentAnime.title}/>
 <Button variant="contained" color="secondary" onClick={()=>{
     const {title,mal_id}=currentAnime;
     const watched={
         title,
         mal_id,
         sub
     }
     AddToWatchlist(watched)
 }}>Add to Watchlist</Button>
 </div>

 <section>
 <p style={{
     textAlign:"center"
 }}>{currentAnime.synopsis}</p>
 </section>
    </section>}
    </section>
    </section>
)
    
    
}

export default Details;
