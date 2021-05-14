import React, { useState ,useEffect} from 'react'

import { CssBaseline, Typography } from '@material-ui/core';

import SearchBar from 'material-ui-search-bar';
import { makeStyles} from '@material-ui/core'


import axios from 'axios'
import AnimeCard from './AnimeCard';
import Loading from './Loading';
import { useHistory } from 'react-router-dom';
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
  const history=useHistory();
  const classes=useStyles();
  
 useEffect(()=>{
    async function getAnime() {
        try {

        setLoaded(true);
   
     
          const data = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${searchText}`,
          {timeout:4000}
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
      
       
       {loaded?<Loading/> :<section className={classes.grid}>
        { animes.length>0? animes.map((anime)=><AnimeCard anime={anime} key={anime.mal_id} />):

      <Typography 
      variant="body2" 
      component="p"
      style={{
        textAlign:'center'
      }}
      >No Results Found.Type Some More Letters</Typography>
      }
       </section>}
       
        </div>
    )
}

export default Initial
