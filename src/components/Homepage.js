import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons, getHackers } from '../actions/actions';
import { Link } from 'react-router-dom';

import standIn from './images/standIn.jpg';
import standIn2 from './images/standIn2.jpg';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Homepage = () => {
        const isFetching = useSelector(state => state.isFetching);
        const dispatch = useDispatch();
        const hackathons = useSelector(state => state.hackathons);
        const hackers = useSelector(state => state.hackers);

        
     
        useEffect(() => {
           dispatch(getHackathons()).then(() => {
            dispatch(getHackers());
           })
        }, []);


        if (isFetching || !hackathons[0] || !hackers) {
           return <h2>Loading Events...</h2>;
        }
       
    return(
        <div className='Homepage'>
           <section>
           <Carousel autoPlay>
            <div>
               <img src={standIn2} />
               <div className="legend">
                 <p>Name: {hackathons[3].name}</p>
                  <p>Start Date: {hackathons[3].start_date}</p>
                  <p>Location: {hackathons[3].location}</p>
                  <p>Description: {hackathons[3].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} />
               <div className="legend">
               <p>Name: {hackathons[1].name}</p>
                  <p>Start Date: {hackathons[1].start_date}</p>
                  <p>Location: {hackathons[1].location}</p>
                  <p>Description: {hackathons[1].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} />
               <div className="legend">
               <div>Name: {hackathons[2].name}</div>
                  <p>Start Date: {hackathons[2].start_date}</p>
                  <p>Location: {hackathons[2].location}</p>
                  <p>Description: {hackathons[2].description}</p>
               </div>
            </div>
           </Carousel>
           </section>
           {/* <section className='openHackathons'>
              <h2>Featured Hackathons</h2>
              <div className='hackathonCards'>
                  <div className='hackathonCard'>
                     <img className='hackathonImage'src={standIn} alt='hackathon image'></img>
                     <p>{hackathons[0].name}</p>
                     <p>{hackathons[0].location}</p>
                  </div>
                  <div className='hackathonCard'>
                     <img className='hackathonImage'src={standIn} alt='hackathon image'></img>
                     <p>{hackathons[1].name}</p>
                     <p>{hackathons[1].location}</p>
                  </div>
                  <div className='hackathonCard'>
                     <img className='hackathonImage'src={standIn} alt='hackathon image'></img>
                     <p>{hackathons[2].name}</p>
                     <p>{hackathons[2].location}</p>
                  </div>
              </div>
           </section> */}
           <section className='blurb'>
               <p className='test'>Hackathon Portal is the hub for everything hackathon. Whether you are coordinating a hackathon, judging a project, or participating, Hackathon Portal is the best way to stay up to date on the event's activity.</p>
           </section>
           <section className='homePageDataDisplay'>
              <div className='display'>
                 <div className='displayInfo'>
                  <h1>{hackathons.length}</h1>
                  <p>Hackathons</p> 
                 </div>
                 <div className='displayInfo'>
                  <h1>{hackers.length}</h1>
                  <p>Users</p> 
                 </div>
                 {/* <div className='displayInfo'>
                  <h1>750</h1>
                  <p>Projects judged</p> 
                 </div> */}
              </div>
           </section>
           {/* <section className='footer'>
            <div className='homepageLinks'>
               <span className='homepageLink'>home</span>
               <span className='homepageLink'>hackathons</span>
               <span className='homepageLink'>log in</span>
               <span className='homepageLink'>register</span>
            </div>
           </section> */}
        </div>
    )
}

export default Homepage;
