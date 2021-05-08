import React, { useState ,useEffect} from 'react'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import { CssBaseline } from '@material-ui/core';

import SearchBar from 'material-ui-search-bar';
import { makeStyles} from '@material-ui/core'


import axios from 'axios'
import AnimeCard from './AnimeCard';
import Loading from './Loading';
const useStyles=makeStyles((theme)=>({
    container:{
        width:"90%",
        maxWidth:"1240px",
        margin:"0px auto",
        overflow:"hidden",
    },
   flex:{
       display:"flex",
      
       alignItems:'center',
       flexDirection:"column"
   },
   grid:{
       display:"grid",
       gridTemplateColumns:'repeat(3,1fr)',
       gridGap:"20px",
       [theme.breakpoints.down('md')]:{
        gridTemplateColumns:'repeat(2,1fr)',
        alignItems:'center'
    } ,
    [theme.breakpoints.down('xs')]:{
        gridTemplateColumns:'1fr',
        placeItems:"center"
        
    }
   }

 }))
const Initial = () => {

  const [searchText,setSearchText]=useState('');
  const [loaded,setLoaded]=useState(false);
  const [animes,setAnimes]=useState([]);
  const classes=useStyles();

 useEffect(()=>{
    async function getAnime() {
        try {

        setLoaded(true);
   
     
          const data = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${searchText}`
          );
          console.table(data.data.results)
          setAnimes(data.data.results)
        } catch(error) {
          console.log("error", error);
          // appropriately handle the error
        }
        setLoaded(false);
      }
  getAnime();
 },[searchText])

    return (
        <div className={classes.container} >
        <CssBaseline/>
        
        <SearchBar 
        value={searchText} 
        onChange={(e)=>setSearchText(e)}
       onCancelSearch={()=>setSearchText('')}
        />
       <LogoutButton/>
       <LoginButton/>
       
       {loaded?<Loading/> :<section className={classes.grid}>
        {animes.map((anime)=><AnimeCard anime={anime} key={anime.mal_id}/>)}
       </section>}
       
        </div>
    )
}

export default Initial
