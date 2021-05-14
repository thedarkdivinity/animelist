import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useAuth0} from '@auth0/auth0-react'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import firebaseDb from '../../../firebase'


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
  }
}));

export default function Comment({mal_id,showComment}) {
  const classes = useStyles();
const {user }=useAuth0();
console.log(showComment)
const {sub,picture}=user;
const [myComment,setMyComment]=useState('');
const AddComment=(obj)=>{
firebaseDb.child(`anime/${mal_id}/comments`).push(
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
    if(myComment.length==0){
      alert("No empty comment")
    }
    else{

    
    const myCommentObject={
   
     user:sub,
     comment:myComment,
     createdAt:Date.now(),
     profilePic:picture
    };
    AddComment(myCommentObject)
    setMyComment('')
}
}
  return (
    <div className={classes.comment}>
    <List>
      {Object.keys(showComment).map(id=>{
        return(
         <ListItem key={id}>
         <ListItemAvatar>
         <Avatar>
         <img src={showComment[id].profilePic} className={classes.profile} alt="random"/>
         </Avatar>

         </ListItemAvatar>
         <ListItemText primary={showComment[id].comment}/>
         </ListItem>
        )
      })}
      </List>
      <form onSubmit={HandleSubmit}>
     <TextField fullWidth variant="outlined"  value={myComment} onChange={(e)=>setMyComment(e.target.value)}/>
     <Button variant="contained" className={classes.submitBtn} color="secondary" type="submit">Submit</Button>
     </form>
    </div>
  );
}
