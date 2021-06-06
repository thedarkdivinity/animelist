import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {  Button,IconButton,List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import { db } from '../../../firebase'
import {useAuth } from '../../../context/AuthContext'
import Avatar from 'react-avatar'

import { Send, ThumbUp} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  comment: {
    width: '100%',
    marginTop:'30px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  profile:{
      
      
      height:"50px",
      borderRadius:"50%"
  },
  grid:{
      display:"grid",
      gridTemplateColumns:'repeat(2,1fr)',
    
  },
  submitBtn:{
      marginTop:"20px",
      borderRadius:"99999px"
  },
  list:{
    width:"90%"
  }
}));

export default function Comment({mal_id,showComment}) {
  const classes = useStyles();
const {currentUser }=useAuth();
console.log(showComment)
const {uid}=currentUser;


 

const [myComment,setMyComment]=useState('');
const [numComments,setNumComments]=useState(0);

useEffect(()=>{
db.child(`anime/${mal_id}/comments`).on("value",snapshot=>{
setNumComments(snapshot.numChildren())
})
},[])
const AddComment=(obj)=>{
db.child(`anime/${mal_id}/comments`).push(
    obj,
    err=>{
        if(err)
        {
            console.log(err)
        }
    }
)
}

const HandleSubmit=(e)=>{
    e.preventDefault()
    if(myComment.length===0){
      alert("No empty comment")
    }
    else{

    
    const myCommentObject={
   
     user:uid,
     comment:myComment,
     createdAt:Date.now(),
     email:currentUser.email
    
    };
    AddComment(myCommentObject)
    setMyComment('')
}

}
  return (
    <div className={classes.comment}>
    <Typography variant="h5" component="h5" style={{textAlign:"center"}}>Comments {numComments}</Typography>
    <List className={classes.list}>
      {Object.keys(showComment).map(id=>{
        return(
         <ListItem className={classes.list} key={id}>
         <ListItemAvatar>
         
         <Avatar name={showComment[id].email} className={classes.profile} size="40px"/>
         

         </ListItemAvatar>
         <ListItemText primary={showComment[id].comment}/>
        
         </ListItem>
        )
      })}
      </List>
      <form onSubmit={HandleSubmit}>
     <TextField fullWidth variant="outlined" required  value={myComment} onChange={(e)=>setMyComment(e.target.value)}/>
     
     <Button variant="contained" className={classes.submitBtn} color="secondary" type="submit" endIcon={<Send/>}>Submit</Button>

     </form>
    </div>
  );
}
