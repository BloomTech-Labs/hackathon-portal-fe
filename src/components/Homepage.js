import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';
import { Link } from 'react-router-dom';

import standIn from './images/standIn.jpg';
import standIn2 from './images/standIn2.jpg';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Homepage = () => {
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
           <section>
           <Carousel autoPlay>
            <div>
               <img src={standIn2} />
               <p className="legend">
                  <div>Start Date: {hackathons[15].start_date}</div>
                  <div>Location: {hackathons[15].location}</div>
                  <div>Description: {hackathons[15].description}</div>
               </p>
            </div>
            <div>
               <img src={standIn2} />
               <p className="legend">
                  <div>Start Date: {hackathons[5].start_date}</div>
                  <div>Location: {hackathons[5].location}</div>
                  <div>Description: {hackathons[5].description}</div>
               </p>
            </div>
            <div>
               <img src={standIn2} />
               <p className="legend">
                  <div>Start Date: {hackathons[10].start_date}</div>
                  <div>Location: {hackathons[10].location}</div>
                  <div>Description: {hackathons[10].description}</div>
               </p>
            </div>
           </Carousel>
           </section>
           <section className='openHackathons'>
              <h2>Open Hackathons</h2>
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
           </section>
           <section className='blurb'>
               <p className='test'>Hackathon Portal is the hub for everything hackathon. Whether you are coordinating a hackathon, judging a project, or participating, Hackathon Portal is the best way to stay up to date on the event's activity.</p>
           </section>
           <section className='homePageDataDisplay'>
              <div className='display'>
                 <div className='displayInfo'>
                  <h1>35</h1>
                  <p>Hackathons</p> 
                 </div>
                 <div className='displayInfo'>
                  <h1>3500</h1>
                  <p>Users</p> 
                 </div>
                 <div className='displayInfo'>
                  <h1>750</h1>
                  <p>Projects judged</p> 
                 </div>
              </div>
           </section>
           <section className='footer'>
            <div className='homepageLinks'>
               <span className='homepageLink'>home</span>
               <span className='homepageLink'>hackathons</span>
               <span className='homepageLink'>log in</span>
               <span className='homepageLink'>register</span>
            </div>
           </section>
        </div>
    )
}

export default Homepage;
