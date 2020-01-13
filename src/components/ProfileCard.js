import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minWidth: 345,
    margin: '1%',
    background: '#1c1c1f',
  },
  media: {
    height: 140,
  },
  text: {
      color: '#d0ddff',
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  }
  
});

export default function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography className={classes.text} gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.text} component='h4'>
           {props.team_name ? (
                `Team: ${props.team_name}`
            ) : null
           }

          </Typography>
          <Typography className={classes.text} variant="body2" color="textSecondary" component="h6">
            {props.user_role}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link to={`/hackathon/${props.id}`}>
        <Button className={classes.button} size="small" color="primary">
          View Details
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}