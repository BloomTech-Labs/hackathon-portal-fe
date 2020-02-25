// The homepage for the website

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons, getHackers } from '../../actions/actions';
import logo1 from '../../images/logo1.png';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import moment from 'moment';

import '../../sass/homepage/homePage.scss'

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
         <div className='homepage'>
            <div className="hero">
               {/* <div className="hero2"> */}
                  <div className="hero-left">
                     <h1>Join a hackathon from anywhere</h1>
                     <p>Hackathon Portal is the hub for everything hackathon. Whether you are coordinating a hackathon, judging aproject, or participating, Hakathon Portal is the best wayu to stay up to date on the event's actvity</p>
                     <button>Join the fun</button>
                  </div>
                  <img className='hero-right' src='https://picsum.photos/300/300'/>
               {/* </div> */}
            </div>
            <section className='middle-content'>
                  <h2>You should totally sign up</h2>
                  <p className='test'>Hackathon Portal is the hub for everything hackathon. Whether you're coordinating a hackathon, judging a project, or participating, Hackathon Portal is the best way to stay up to date on the event's activity.</p>
                  <div className="values">
                     <div>
                        <h3>Organize</h3>
                        <p>At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.</p>
                     </div>
                     <div>
                        <h3>Participate</h3>
                        <p>At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.</p>
                     </div>
                     <div>
                        <h3>Evaluate</h3>
                        <p>At eripuit signiferumque sea, vel ad mucius molestie, cu labitur iuvaret vulputate sed.</p>
                     </div>
                  </div>
                     </section>
            <section className='homePageDataDisplay'>
                  <h2>Upcoming Hackathons</h2>
                  <div className='upcoming-hackathons'>
                     <div className="hackathon-card">Hack #1</div>
                     <div className="hackathon-card">Hack #2</div>
                     <div className="hackathon-card">Hack #3</div>
                     </div>
                  <div className='displayInfo'>
                     <Link>See more hackathons</Link>
                  </div>
            </section>
        </div>
       </>
   )
}

export default Homepage;
