import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height:"100%",
    position:'relative',
    width:'100%'
  },
  media: {
    height: 180,
  },
  learnMore:{
      position:"absolute",
      
      bottom:"0%",
      left:"0%",
      textDecoration:"none",
      fontWeight:"bold"
  }
});

const AnimeCard=({anime})=> {
  const classes = useStyles();
 const history=useHistory();
const{title,image_url,synopsis,mal_id}=anime;
  return (
    
    <Card className={classes.root}>
      <CardActionArea onClick={()=>history.push(`/details/${mal_id}`)}>
        <CardMedia
          className={classes.media}
          image={image_url}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {synopsis?synopsis:"No Description Found"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       
        <Button className={classes.learnMore} color="secondary" onClick={()=>{
         
           history.push(`/details/${mal_id}`)
        }} >
           Review this anime
      
          </Button>
      </CardActions>
    </Card>
   
  );
}
export default AnimeCard;