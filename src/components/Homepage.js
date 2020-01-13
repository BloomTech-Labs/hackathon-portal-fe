import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';
import { Link } from 'react-router-dom';
import standIn from './images/standIn.jpg';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Carousel from './carousel';

let openHackathonsArray = []

const Homepage = () => {
   const [activeStep, setActiveStep] = React.useState(0);
   // const maxSteps = tutorialSteps.length;
 
   const handleNext = () => {
     setActiveStep(prevActiveStep => prevActiveStep + 1);
   };
 
   const handleBack = () => {
     setActiveStep(prevActiveStep => prevActiveStep - 1);
   };
 
   const handleStepChange = step => {
     setActiveStep(step);
   };
      //   const classes = useStyles();
        const isFetching = useSelector(state => state.isFetching);
        const dispatch = useDispatch();
        const hackathons = useSelector(state => state.hackathons);
     
        useEffect(() => {
           dispatch(getHackathons());
        }, []);
     
        if (isFetching || !hackathons[0]) {
           return <h2>Loading Events...</h2>;
        }


    return(
        <div className='Homepage'>
                <Carousel className='carousel'></Carousel>
                {/* <div className='leftArrow' onClick={handleBack, console.log('yeah this was clicked')} disabled={activeStep === 2}>></div>
                <div className='rightArrow' onClick={handleNext} disabled={activeStep === 0}>></div> */}

                <div id='openhackathon'>Open Hackathons</div>
                
                <div className='rectangle'>
                   <img class='hackathonImage' src={standIn}></img>
                </div>
                <div className='hackathonTitle'>{hackathons[2].name}</div>
                <div className='location'>{hackathons[2].location}</div>
            
                <div className='rectangle2'>
                  <img class='hackathonImage' src={standIn}></img>
                </div>
                <div className='hackathonTitle2'>{hackathons[7].name}</div>
                <div className='location2'>{hackathons[7].location}</div>
          
                <div className='rectangle3'>
                  <img class='hackathonImage' src={standIn}></img>
                </div>
                <div className='hackathonTitle3'>{hackathons[1].name}</div>
                <div className='location3'>{hackathons[1].location}</div>    
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
