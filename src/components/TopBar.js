import React from 'react'
import { Button, ButtonGroup, makeStyles, Paper, Typography} from '@material-ui/core'

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
    return (
       
      <Paper className={classes.paper}>
      <div className={classes.grid}>
      <img src={user.picture}  className={classes.photo} alt={user.name}/>
      <div>
      <Typography variant="h5" component="h5" className={classes.marginTopOnMobile}>{user.name}</Typography>
      <ButtonGroup  className={classes.marginTopOnMobile} variant="contained" color="secondary">
      <Button> Rate Anime</Button>
      <Button>Suggest Anime</Button>
      </ButtonGroup>
      <Typography variant="h6" style={{textAlign:"center"}} className={classes.marginTopOnMobile} component="h6">Rated Places: 0</Typography>
      </div>
      </div>
      </Paper>
    )
}

export default TopBar
