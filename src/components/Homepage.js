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
            let filtered =  arr.filter(h => h.is_open === true && (
                  moment(h.end_date).isSame(currentDate) ||
                  moment(h.end_date).isAfter(currentDate)
            ) && (
               h.name.length && h.description.length
            ))
           return [filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))],
            filtered[Math.floor(Math.random() * Math.floor(filtered.length))]
         ]
      };
     
      const randomHackathons = randomize(hackathons)
      console.log(randomHackathons)
      console.log(hackathons)
       
    return(
      <div className='Homepage'>
           <section>
           <Carousel autoplay>
            <div>
               <img src={logo1} alt="computer monitors" />
               <div className="legend" onClick={() => props.history.push(`/hackathon/${randomHackathons[0].id}`)}>
                 <p>{randomHackathons[0].name}</p>
                  <p>Start Date: {formatDate(randomHackathons[0].start_date)}</p>
                  <p>Location: {randomHackathons[0].location}</p>
                  <p>Description: {randomHackathons[0].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} alt="computer monitors" />
               <div className="legend" onClick={() => props.history.push(`/hackathon/${randomHackathons[1].id}`)}>
               <p>{randomHackathons[1].name}</p>
                  <p>Start Date: {randomHackathons[1].start_date}</p>
                  <p>Location: {formatDate(randomHackathons[1].location)}</p>
                  <p>Description: {randomHackathons[1].description}</p>
               </div>
            </div>
            <div>
               <img src={standIn2} alt="computer monitors" />
               <div className="legend" onClick={() => props.history.push(`/hackathon/${randomHackathons[2].id}`)}>
               <div>{randomHackathons[2].name}</div>
                  <p>Start Date: {formatDate(randomHackathons[2].start_date)}</p>
                  <p>Location: {randomHackathons[2].location}</p>
                  <p>Description: {randomHackathons[2].description}</p>
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
