import React, { useEffect, useState } from 'react'
import {  useHistory, useParams } from 'react-router-dom'
import { Button, CssBaseline, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import Loading from '../Loading';
import firebaseDb from '../../firebase'
import { useAuth0} from '@auth0/auth0-react'
import DetailsTable from './DetailsTable';
import { CurrentAnimeContext } from '../../context/CurrentAnimeContext';
import Comment from './commentsection/Comment';
const useStyles=makeStyles((theme)=>({
    mainSection:{
        width:'100%'
        
    },
    images:{
        
        display:'block',
       height:"84%",
        margin:'0px auto'
    },
    container:{
        width:"94%",
        maxWidth:"1240px",
        margin:"0px auto",
        overflow:"none",
    },
    gridSystem:{
        display:'grid',
        justifyContent:'center',
        width:'100%',
        gridTemplateColumns:'repeat(2,1fr)',
        [theme.breakpoints.down('xs')]:{
            gridTemplateColumns:'1fr',
            justifyContent:'center',
            gridGap:'40px'
        }

    },
    title:{
        textAlign:'center',
        marginBottom:'30px',
    },
    watchlistBtn:{
        display:"block",
        margin:"20px auto"
    }
}))
const Details = () => {
    const { user}=useAuth0();
    const history=useHistory();
    const {sub}=user;
    console.log(user.sub)
const[currentAnime,setCurrentAnime]=useState({});
const[loading,setLoading]=useState(false);
const [isPresent,setIsPresent]=useState(false);
const [commentObjects,setCommentObjects]=useState({});
   const classes=useStyles();
    const {mal_id}=useParams();
   useEffect(()=>{
    const getAnimeDetails=async()=>{
        try {
            setLoading(true);
            const data=await axios.get(`https://api.jikan.moe/v3/anime/${mal_id}`,{timeout:4000});
           console.log(data.data)
            setCurrentAnime(data.data);


        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    }
    const alreadyAdded=()=>{
        firebaseDb.child(`users/${sub}/watchlist`).orderByChild('mal_id').equalTo(mal_id).once("value",snapshot=>{
            if(snapshot.exists()){
                console.log('already added')
                setIsPresent(true);
            }
            else
            {
                console.log('Not present in watchlist')
                setIsPresent(false);
            }
        })
    }
    const getComments=()=>{
        firebaseDb.child(`anime/${mal_id}/comments`).on("value",snapshot=>{
            if(snapshot.val()!=null)
            {
                setCommentObjects({
                    ...snapshot.val()
                })
            }
        })
    }
    getAnimeDetails();
    alreadyAdded();
    getComments();
  
   },[])
   const AddToWatchlist=(obj)=>{
    firebaseDb.child(`users/${sub}/watchlist`).push(obj,
        err=>{
            if(err)
            {
                console.log(err);
            }
            else{
                setIsPresent(true)
            }
        }
        
        )
        
   }
 
   
return(

<section className={classes.mainSection}>
<CurrentAnimeContext.Provider
    value={{currentAnime,setCurrentAnime}}
    >
<CssBaseline/>

{loading?<Loading/>:
    <section className={classes.container}>
    <Typography variant="h3" component="h3"  className={classes.title}>{currentAnime.title}</Typography>
    <section className={classes.gridSystem}>
    <section>
    <img src={currentAnime.image_url} className={classes.images} alt=""/>
    {!isPresent?<Button 
    variant="contained" 
    color="secondary" 
    className={classes.watchlistBtn}
    onClick={()=>{
        const watchlistObject={
            mal_id,
            title:currentAnime.title

        }
        AddToWatchlist(watchlistObject)
    }}
    >Add To watchlist</Button>:
<Button variant="contained"
 color="secondary"
 className={classes.watchlistBtn}
 onClick={()=>{
     history.push('/profile')
 }}
 >View in profile</Button>
}

    </section>
    
    <DetailsTable />
  
    </section>
    </section>
}
{ currentAnime.synopsis && <section className={classes.container}>
<Paper style={{
    marginTop:"40px",
    padding:'10px 20px'
    

}}>
<Typography variant="body2" style={{
    padding:'1px 20px',
    textAlign:'center'
}}>
{currentAnime.synopsis}
</Typography>

</Paper>

</section>}
<section className={classes.container}>
<Comment mal_id={mal_id} showComment={commentObjects}/>
</section>
</CurrentAnimeContext.Provider>
</section>

)
    
    
}

export default Details;
