import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons, getHackers } from '../actions/actions';
import standIn2 from './images/standIn2.jpg';
import ServerModal from './Organizers/modal';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Homepage = () => {
        const isFetching = useSelector(state => state.isFetching);
        const dispatch = useDispatch();
        const hackers = useSelector(state => state.hackers);
        const hackathons = useSelector(state => state.hackathons);
           

        useEffect(() => {
           dispatch(getHackathons()).then(() => {
            dispatch(getHackers());
           })
        }, [dispatch]);

        
        if (isFetching || !hackathons || !hackers) {
         return <h2>Loading Events...</h2>;
      }else if(!hackathons[0]){
         return <h2>Loading Events...</h2>
      }
       
    return(
        <div className='Homepage'>
           <ServerModal></ServerModal>
           <section>
           <Carousel autoPlay>
            <div>
               <img src={standIn2} alt="computer monitors" />
               <div className="legend">
                 <p>Name: {hackathons[3].name}</p>
                  <p>Start Date: {hackathons[3].start_date}</p>
                  <p>Location: {hackathons[3].location}</p>
                  <p>Description: {hackathons[3].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} alt="computer monitors" />
               <div className="legend">
               <p>Name: {hackathons[1].name}</p>
                  <p>Start Date: {hackathons[1].start_date}</p>
                  <p>Location: {hackathons[1].location}</p>
                  <p>Description: {hackathons[1].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} alt="computer monitors" />
               <div className="legend">
               <div>Name: {hackathons[2].name}</div>
                  <p>Start Date: {hackathons[2].start_date}</p>
                  <p>Location: {hackathons[2].location}</p>
                  <p>Description: {hackathons[2].description}</p>
               </div>
            </div>
           </Carousel>
           </section>
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
              </div>
           </section>
        </div>
    )
}

export default Homepage;
