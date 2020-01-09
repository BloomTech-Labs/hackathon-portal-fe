import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Carousel from './carousel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
   section: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
   },

   paragraph: {
      display: 'flex',
      justifyContent: 'center',
      width: '70%',
      textAlign: 'center',
      color: 'royalblue'
   },

   liveInformation: {
      display: 'flex',
   },

   information: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0% 5%'
   }

//    card: {
      
//       maxWidth: '30%',
//       margin: '10%',

//       background: '#1c1c1f',
//       border: '1px solid #D0DDFF',
//       boxSizing: 'border-box',
//       borderRadius: '13.5px',
//       color: '#D0DDFF',


//    },
//    cardparent: {
//     display: 'flex',
//     flexWrap: 'wrap',
    
//   },

//    media: {
//       height: 0,
//       paddingTop: '56.25%' // 16:9
//    },
//    expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//          duration: theme.transitions.duration.shortest
//       })
//    },
//    expandOpen: {
//       transform: 'rotate(180deg)'
//    },
//    avatar: {
//       backgroundColor: red[500]
//    }
}));

const Homepage = () => {
        const classes = useStyles();
        const isFetching = useSelector(state => state.isFetching);
        const dispatch = useDispatch();
        const hackathons = useSelector(state => state.hackathons);
     
        console.log(hackathons);
     
        useEffect(() => {
           dispatch(getHackathons());
        }, []);
     
        if (isFetching) {
           return <h2>Loading Events...</h2>;
        }

      console.log('this is hackathons', hackathons[0]);

    return(
        <div className='Homepage'>
            <section className={classes.section}>
                <Carousel></Carousel>
            </section>
            <section className={classes.section}>
                <h2>Open Hackathons</h2>
                <div className='openHackathonsHolder'>
                    <div className='openHackathonCard'>
                        <img src='#' alt='Hackthon picture'></img>
                        <h4>Big Hackthon</h4>
                        <p>Location: Based in Vancouver</p>
                    </div>
                </div>
            </section>
            <section className={classes.section}>
               <paragraph className={classes.paragraph}>
                  Hackthon Portal is the hub for everything hackathon. Whether you are coordination a hackathon, judging a project, or particpating, Hackathon Portal is the best way to stay up to date on the event's activity.
               </paragraph>
               <div className={classes.liveInformation}>
                  <span className={classes.information}>
                     <h1>35</h1>
                     <h2>Hackathons</h2>
                  </span>
                  <span className={classes.information}>
                     <h1>3500</h1>
                     <h2>Users</h2>
                  </span>
                  <span className={classes.information}>
                     <h1>750</h1>
                     <h2>Projects Judged</h2>
                  </span>
               </div>
            </section>
        </div>
    )
}

export default Homepage;