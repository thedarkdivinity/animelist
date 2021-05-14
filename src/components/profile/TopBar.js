import React from 'react'
import { Button, ButtonGroup, makeStyles, Paper, Typography} from '@material-ui/core'
import LogoutButton from '../LogoutButton';
import { useHistory } from 'react-router-dom';

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
    const classes=useStyles();
    const history=useHistory();
    return (
       
      <Paper className={classes.paper}>
      <div className={classes.grid}>
      <img src={user.picture}  className={classes.photo} alt={user.name}/>
      <div>
      <Typography variant="h5" component="h5" className={classes.marginTopOnMobile}>{user.name}</Typography>
      <ButtonGroup  className={classes.marginTopOnMobile} variant="contained" color="secondary">
      <Button onClick={()=>history.push('/')}> Search Anime</Button>
      <LogoutButton/>
      </ButtonGroup>
     
      </div>
      </div>
      </Paper>
    )
}

export default TopBar
