import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//STYLES
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    card: {
      maxWidth: '25%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 26,
    },
    pos: {
      marginBottom: 12,
    },
  });


 
const OrganizerProjectList = props => {
    const classes = useStyles();
    const hackathon = useSelector(state => state.singleHackathon)


     if (!hackathon) {
    return <h2>Loading...</h2>

}


    return(

        <Card className={classes.card} >
             <Link
                 to={`/hackathon/${hackathon.id}/create/project`}
                 className={classes.link}
             >
                <CardContent>
                    <AddIcon />
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Create Project 
                    </Typography>
                </CardContent>
             </Link>
        </Card>


    )
};

export default OrganizerProjectList;