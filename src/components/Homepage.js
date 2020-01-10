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
   },

   card: {
      
      maxWidth: '30%',
      margin: '10%',

      background: '#1c1c1f',
      border: '1px solid #D0DDFF',
      boxSizing: 'border-box',
      borderRadius: '13.5px',
      color: '#D0DDFF',


   },
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
     
        if (isFetching || !hackathons[0]) {
           return <h2>Loading Events...</h2>;
        }

    return(
        <div className='Homepage'>
                <Carousel className='carousel'></Carousel>
                <div className='leftArrow'>></div>
                <div className='rightArrow'>></div>
                {/* <div className='blurb2'>Start Date: February 15, 2020
                  Location: Silicon Valley 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At urna condimentum mattis pellentesque. Facilisis gravida neque convallis a cras semper.</div> */}

                <div id='openhackathon'>Open Hackathons</div>
                
                <div className='rectangle'></div>
                <div className='hackathonTitle'>Big Hackathon</div>
                <div className='location'>Based in Vancouver</div>
            
                <div className='rectangle2'></div>
                <div className='hackathonTitle2'>Another one</div>
                <div className='location2'>Based in California</div>
          
                <div className='rectangle3'></div>
                <div className='hackathonTitle3'>And Another</div>
                <div className='location3'>Based in Canada</div>    
                <div className='division4'></div> 

               <div className='blurb'>
                  Hackthon Portal is the hub for everything hackathon. Whether you are coordination a hackathon, judging a project, or particpating, Hackathon Portal is the best way to stay up to date on the event's activity.
               </div>

                <div className='number'>35</div>
                <div className='hackathonsText'>Hackathons</div>

                <div className='number2'>3500</div>
                <div className='usersText'>Users</div>

                <div className='number3'>750</div>
                <div className='projectsText'>Projects Judged</div>

                <div className='divsion6'></div>
               <div className='group1'>home</div>
               <div className='group2'>hackathons</div>
               <div className='group3'>log in</div>
               <div className='group4'>register</div>
        </div>
    )
}

export default Homepage;