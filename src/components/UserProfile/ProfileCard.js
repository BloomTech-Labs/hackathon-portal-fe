// Displays you're projects, past and present, on UserProfile.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    padding: '0',
    maxWidth: 345,
    minWidth: 345,
    margin: '1%',
    background:
      'rgb(22,22,23)',
    boxShadow: 'none',
    borderBottom: '1px solid #606060'
    // background: '#1c1c1f',
  },
  media: {
    height: 140,
  },
  text: {
    textAlign: 'left',
    color: 'white'
  },
  button: {
    display: 'flex',
    fontWeight: 'bold',
    color: '#4885E1'
  },
  cardInner: {
    padding: '0',
  }

});

export default function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.cardInner}>
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