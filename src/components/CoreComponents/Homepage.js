// The homepage for the website

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons, getHackers } from '../../actions/actions';
import logo1 from '../../images/logo1.png';
import Loader from 'react-loader-spinner';

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
         return <Loader type="Rings" color="#4885E1" height={100} width={100} />
      }else if(!hackathons[0]){
         return <Loader type="Rings" color="#4885E1" height={100} width={100} />
      }

        const randomize = arr => {
            let filtered =  arr.filter(h => !h.is_open === false && (
                  moment(h.start_date).isSame(currentDate) ||
                  moment(h.start_date).isAfter(currentDate)
            ) && (
               h.name.length && h.description.length
            ))
          
           return [filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))]
         ]
      };
     
      const hacks = randomize(hackathons)
      const randomHackathons = [...new Set(hacks)];

    return (
       <>
       { !randomHackathons.length ? (
          <Loader type="Rings" color="#4885E1" height={80} width={80} />
       ) : (
      <div className='Homepage'>
           <section>
           <Carousel autoplay>
            {randomHackathons.map(r => (
                <div className='featured-card'>
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
               <p className='test'>Hackathon Portal is the hub for everything hackathon. Whether you're coordinating a hackathon, judging a project, or participating, Hackathon Portal is the best way to stay up to date on the event's activity.</p>
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
