// The homepage for the website
// Do we want to display all of upcoming hackathons or just 3?

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons, getHackers } from "../../actions/actions";
import Load from '../Reusable/LoaderWithContainer.jsx';
import { Link } from "react-router-dom";
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';

import "react-responsive-carousel/lib/styles/carousel.min.css";

import moment from "moment";

import "../../sass/homepage/homePage.scss";

import HackathonCard from "../Reusable/HackathonCard";

import laptop from '../../svgs/laptop.svg'
import organize from "../../svgs/organize.svg"
import participate from '../../svgs/participate.svg'
import evaluate from '../../svgs/evaluate.svg'

const Homepage = (props) => {
  const isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();
  const hackers = useSelector(state => state.hackers);
  const hackathons = useSelector(state => state.hackathons);
  const currentDate = new Date().toString();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    dispatch(getHackathons()).then(() => {
      dispatch(getHackers());
    });
  }, [dispatch]);

  if (isFetching || !hackathons || !hackers) {
    return <Load />;
   } // removed redundant !hackathons[0]

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
              <h1>Join a hackathon from <span>anywhere</span>.</h1>
              <p>
                Hackathon Portal is the best way to organize or participate in hackathon events.
              </p>
              <button className='logIn-OutButton'
                id='login-btn'
                onClick={() => loginWithRedirect({})}
                >Get Started</button>
            </div>
            <img className='hero-right' src={laptop} alt='a person laying down with laptop' />
          </div>
        </div>
        <section className="middle-content">
          <div className='values-header'>
            <h2>Features</h2>
            <p>
              Hackathon Portal makes it easier to get involved.
            </p>
          </div>
          <div className="values">
            <div>
              <img src={organize} alt='a clipboard' />
              <h3>Organize</h3>
              <p>
                Get things moving with our streamlined process. Organizing a hackathon has never been faster.
              </p>
            </div>
            <div>
              <img src={participate} alt='an award for winning' />
              <h3>Participate</h3>
              <p>
                Add to your portfolio while meeting new people. Participate in remote or offline events.
              </p>
            </div>
            <div>
              <img src={evaluate} alt='a box that has the words vote on it' />
              <h3>Evaluate (coming soon)</h3>
              <p>
                Move through the judging process quicker. Evaluate submissions with minimal effort.
              </p>
            </div>
          </div>
        </section>
        <section className="homePageDataDisplay">
          <h2>Upcoming Hackathons</h2>
          <div className="upcoming-hackathons">
            {upcomingHackathons.slice(0, 3).map(hackathon => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
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
