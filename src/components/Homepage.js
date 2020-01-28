import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons, getHackers } from '../actions/actions';
import standIn2 from './images/standIn2.jpg';
import logo1 from './images/logo1.png';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import moment from 'moment';

const formatDate = date => {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ];
   const newDate = new Date(date);
   const y = newDate.getFullYear();
   const d = newDate.getDate();
   const m = months[newDate.getMonth()];
   return `${m} ${d}, ${y}`;
};



const Homepage = (props) => {
        const isFetching = useSelector(state => state.isFetching);
        const dispatch = useDispatch();
        const hackers = useSelector(state => state.hackers);
        const hackathons = useSelector(state => state.hackathons);
        const currentDate = new Date().toString();
       
           

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

        const randomize = arr => {
            let filtered =  arr.filter(h => !h.is_open === false && (
                  moment(h.end_date).isSame(currentDate) ||
                  moment(h.end_date).isAfter(currentDate)
            ) && (
               h.name.length && h.description.length
            ))
            console.log(filtered)
           return [filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))]
         ]
      };
     
      const hacks = randomize(hackathons)
      const randomHackathons = [...new Set(hacks)];
      console.log(randomHackathons)

    return (
       <>
       { !randomHackathons.length ? (
          <h2>Loading...</h2>
       ) : (
      <div className='Homepage'>
           <section>
           <Carousel autoplay>
            {randomHackathons.map(r => (
                <div>
                <img src={logo1} alt="computer monitors" />
                  <div className="legend" onClick={() => props.history.push(`/hackathon/${randomHackathons[0].id}`)}>
                     <h2>{r.name}</h2>
                     <p>Begins {formatDate(r.start_date)}</p>
                     <p>{r.location}</p>
                     <p>{r.description}</p>
                  </div>
               </div>
            ))
         }
 
           </Carousel>
           </section>
           <section className='blurb'>
               <p className='test'>Hackathon Portal is the hub for everything hackathon. Whether you are coordinating a hackathon, judging a project, or participating, Hackathon Portal is the best way to stay up to date on the event's activity.</p>
           </section>
           <section className='homePageDataDisplay'>
              <div className='display' id='display-bottom'>
                 <div className='displayInfo'>
                  <h1>{hackathons.length}</h1>
                  <h3>Hackathons</h3> 
                 </div>
                 <div className='displayInfo'>
                  <h1>{hackers.length}</h1>
                  <h3>Users</h3> 
                 </div>
              </div>
           </section>
        </div>
       )}
       </>
   )
}

export default Homepage;
