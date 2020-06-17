import React from "react";

import "../../sass/about/about.scss";

import cheer from '../../svgs/cheer.svg';
import teamwork from '../../svgs/teamwork.svg';
import team from '../../svgs/team.svg';
import heart from '../../svgs/heart.svg'

const About = () => {
  return (
    <div className="about">
      <div className="hero-background">
        <div className="hero-content">
          <img className="hero-left" src={cheer} alt='a group of three people cheering and jumping in the air' />
          <div className="hero-right">
            {/* <h4>About Hackathon Portal</h4> */}
            <h1>We make <br />hackathons <span>easier</span>.</h1>
            <p>
              Hackathon Portal is the hub for everything hackathon.
              Whether you are organizing a hackathon, participating, or evaluating a project,
              Hackathon Portal is the best way to stay up to date on the event’s activity.
            </p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-content">
          <div className="bottom-left">
            <h2>
              Fostering creativity, competition, and camaraderie.
            </h2>
            <div className="values">
              <div className="value-left">
                <img src={team} alt='two people' />
                <p>
                  Make new friends by teaming up with other participants.
                </p>
              </div>
              <div className="value-right">
                <img src={heart} alt='a heart' />
                <p>
                  Have a great time while building something you love.
                </p>
              </div>
            </div>
          </div>
          <img className="bottom-right" alt='team members' src={teamwork} />
        </div>
      </div>
    </div>
  );
};

export default About;
