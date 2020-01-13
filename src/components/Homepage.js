import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';
import { Link } from 'react-router-dom';
import standIn from './images/standIn.jpg';

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
               <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
               <p className="legend">Legend 1</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
               <p className="legend">Legend 2</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
               <p className="legend">Legend 3</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
               <p className="legend">Legend 4</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" />
               <p className="legend">Legend 5</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
               <p className="legend">Legend 6</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" />
               <p className="legend">Legend 7</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" />
               <p className="legend">Legend 8</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" />
               <p className="legend">Legend 9</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-10.jpg" />
               <p className="legend">Legend 10</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-11.jpg" />
               <p className="legend">Legend 11</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-12.jpg" />
               <p className="legend">Legend 12</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" />
               <p className="legend">Legend 13</p>
            </div>
            <div>
               <img src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" />
               <p className="legend">Legend 14</p>
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
