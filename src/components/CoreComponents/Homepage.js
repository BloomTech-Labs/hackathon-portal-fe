// The homepage for the website
// Do we want to display all of upcoming hackathons or just 3?

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons, getHackers } from "../../actions/actions";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import moment from "moment";

import "../../sass/homepage/homePage.scss";

import HackathonCard from "../Reusable/HackathonCard";

const Homepage = props => {
  const isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();
  const hackers = useSelector(state => state.hackers);
  const hackathons = useSelector(state => state.hackathons);
  const currentDate = new Date().toString();
   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    dispatch(getHackathons()).then(() => {
      dispatch(getHackers());
    });
  }, [dispatch]);

  if (isFetching || !hackathons || !hackers) {
    return <Loader type="Rings" color="#4885E1" height={100} width={100} />;
  } else if (!hackathons[0]) {
    return <Loader type="Rings" color="#4885E1" height={100} width={100} />;
  }

  let upcomingHackathons = hackathons
    ? hackathons.filter(hackathon => {
      if (moment(hackathon.start_date).isAfter(currentDate)) {
        return hackathon;
      }
    })
    : [];

  return (
    <>
      <div className="homepage">
        <div className="hero-background">
          <div className="hero-content">
            <div className="hero-left">
              <h1>Join a hackathon from anywhere</h1>
              <p>
                Hackathon Portal is the hub for everything hackathon. Whether
                you are coordinating a hackathon, judging aproject, or
                participating, Hakathon Portal is the best wayu to stay up to
                date on the event's actvity
              </p>
              <button  className='logIn-OutButton'
                  id='login-btn'
                  onClick={() => loginWithRedirect({})}>Join the fun</button>
            </div>
            <img className="hero-right" src="https://picsum.photos/300/300" />
          </div>
        </div>
        <section className="middle-content">
          <h2>You should totally sign up</h2>
          <p>
            Hackathon Portal is the hub for everything hackathon. Whether you're
            coordinating a hackathon, judging a project, or participating,
            Hackathon Portal is the best way to stay up to date on the event's
            activity.
          </p>
          <div className="values">
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 8.50001C21.1946 8.81156 21.0236 9.23042 21.0236 9.66667C21.0236 10.1029 21.1946 10.5218 21.5 10.8333L24.1667 13.5C24.4782 13.8054 24.8971 13.9764 25.3333 13.9764C25.7696 13.9764 26.1885 13.8054 26.5 13.5L32.7833 7.21667C33.6214 9.06866 33.8751 11.1321 33.5108 13.1319C33.1464 15.1318 32.1812 16.9731 30.7438 18.4105C29.3064 19.8479 27.4651 20.8131 25.4652 21.1774C23.4654 21.5418 21.402 21.2881 19.55 20.45L8.03334 31.9667C7.3703 32.6297 6.47102 33.0022 5.53334 33.0022C4.59565 33.0022 3.69638 32.6297 3.03334 31.9667C2.3703 31.3036 1.9978 30.4044 1.9978 29.4667C1.9978 28.529 2.3703 27.6297 3.03334 26.9667L14.55 15.45C13.7119 13.598 13.4582 11.5346 13.8226 9.53476C14.187 7.53491 15.1521 5.6936 16.5895 4.25621C18.0269 2.81882 19.8682 1.85362 21.8681 1.48924C23.8679 1.12487 25.9314 1.37861 27.7833 2.21667L21.5167 8.48334L21.5 8.50001Z"
                  stroke="#373F41"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Organize</h3>
              <p>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
                iuvaret vulputate sed.
              </p>
            </div>
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 8.50001C21.1946 8.81156 21.0236 9.23042 21.0236 9.66667C21.0236 10.1029 21.1946 10.5218 21.5 10.8333L24.1667 13.5C24.4782 13.8054 24.8971 13.9764 25.3333 13.9764C25.7696 13.9764 26.1885 13.8054 26.5 13.5L32.7833 7.21667C33.6214 9.06866 33.8751 11.1321 33.5108 13.1319C33.1464 15.1318 32.1812 16.9731 30.7438 18.4105C29.3064 19.8479 27.4651 20.8131 25.4652 21.1774C23.4654 21.5418 21.402 21.2881 19.55 20.45L8.03334 31.9667C7.3703 32.6297 6.47102 33.0022 5.53334 33.0022C4.59565 33.0022 3.69638 32.6297 3.03334 31.9667C2.3703 31.3036 1.9978 30.4044 1.9978 29.4667C1.9978 28.529 2.3703 27.6297 3.03334 26.9667L14.55 15.45C13.7119 13.598 13.4582 11.5346 13.8226 9.53476C14.187 7.53491 15.1521 5.6936 16.5895 4.25621C18.0269 2.81882 19.8682 1.85362 21.8681 1.48924C23.8679 1.12487 25.9314 1.37861 27.7833 2.21667L21.5167 8.48334L21.5 8.50001Z"
                  stroke="#373F41"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3>Participate</h3>
              <p>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
                iuvaret vulputate sed.
              </p>
            </div>
            <div>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 8.50001C21.1946 8.81156 21.0236 9.23042 21.0236 9.66667C21.0236 10.1029 21.1946 10.5218 21.5 10.8333L24.1667 13.5C24.4782 13.8054 24.8971 13.9764 25.3333 13.9764C25.7696 13.9764 26.1885 13.8054 26.5 13.5L32.7833 7.21667C33.6214 9.06866 33.8751 11.1321 33.5108 13.1319C33.1464 15.1318 32.1812 16.9731 30.7438 18.4105C29.3064 19.8479 27.4651 20.8131 25.4652 21.1774C23.4654 21.5418 21.402 21.2881 19.55 20.45L8.03334 31.9667C7.3703 32.6297 6.47102 33.0022 5.53334 33.0022C4.59565 33.0022 3.69638 32.6297 3.03334 31.9667C2.3703 31.3036 1.9978 30.4044 1.9978 29.4667C1.9978 28.529 2.3703 27.6297 3.03334 26.9667L14.55 15.45C13.7119 13.598 13.4582 11.5346 13.8226 9.53476C14.187 7.53491 15.1521 5.6936 16.5895 4.25621C18.0269 2.81882 19.8682 1.85362 21.8681 1.48924C23.8679 1.12487 25.9314 1.37861 27.7833 2.21667L21.5167 8.48334L21.5 8.50001Z"
                  stroke="#373F41"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h3>Evaluate</h3>
              <p>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur
                iuvaret vulputate sed.
              </p>
            </div>
          </div>
        </section>
        <section className="homePageDataDisplay">
          <h2>Upcoming Hackathons</h2>
          <div className="upcoming-hackathons">
            {upcomingHackathons.slice(0, 3).map(hackathon => (
              <HackathonCard hackathon={hackathon} />
            ))}
          </div>

          <div className="displayInfo">
            <Link to="/hackathons"> See more hackathons </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
// import {style} from "../../styles/hackathonListStyles";
