import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getHackathons } from '../actions/actions';


//material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';



const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


function Hackathons(props) {
  const classes = useStyles();
  const isFetching = useSelector(state => state.isFetching)
  const dispatch = useDispatch()
  const hackathons = useSelector(state => state.hackathons)

  console.log(hackathons)

  useEffect(() => {
    dispatch(getHackathons())
  }, [])

  if (isFetching) {
            return <h2>Loading Events...</h2>;
          }
 
  return (
    <div> 
     
    {hackathons.map(hackathon => {
        return(
    <Card className={classes.card}>
      <CardHeader
        title={hackathon.name}
        subheader={hackathon.start_date}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {hackathon.description}
        </Typography>
      </CardContent>
    </Card>
        )
    })}
    </div>  
  );
}

export default Hackathons;
