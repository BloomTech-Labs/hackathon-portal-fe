// Displays a list of all hackathons
// Has a search function to find hackathons
// Try to extract search function and create its own component
// Don't forget to delete past hackathons page
// Take out the upcoming hackathon component and make it a reuseable

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons } from "../../actions/actions";
import moment from "moment";

import Loader from "react-loader-spinner";

import HackathonCard from "../Reusable/HackathonCard";

const formatDate = date => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const newDate = new Date(date);
  const y = newDate.getFullYear();
  const d = newDate.getDate();
  const m = months[newDate.getMonth()];
  return `${m} ${d}, ${y}`;
};

function Hackathons(props) {
  //   const classes = useStyles();
  const isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();
  const hackathons = useSelector(state => state.hackathons);
  const [searchTerm, setSearchTerm] = useState("");
  const currentDate = new Date().toString();

  const [dropdown, setDropdown] = useState(false);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    dispatch(getHackathons());
  }, [dispatch]);

  let upcomingHackathons = hackathons
    ? hackathons.filter(hackathon => {
      if (moment(hackathon.start_date).isAfter(currentDate)) {
        return hackathon;
      }
    })
    : [];
  let activeHackathons = hackathons
    ? hackathons.filter(hackathon => {
      if (
        (moment(hackathon.start_date).isBefore(currentDate) &&
          moment(hackathon.end_date).isAfter(currentDate)) ||
        moment(hackathon.start_date).isSame(currentDate) ||
        moment(hackathon.end_date).isSame(currentDate)
      ) {
        return hackathon;
      }
    })
    : [];
  let pastHackathons = hackathons
    ? hackathons.filter(hackathon => {
      if (moment(hackathon.end_date).isBefore(currentDate)) {
        return hackathon;
      }
    })
    : [];

  // console.log(upcomingHackathons);
  // console.log(pastHackathons);

  const results = !searchTerm.length
    ? hackathons
    : hackathons.filter(
      hackathon =>
        hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        hackathon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(hackathon.start_date)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  if (isFetching || !hackathons) {
    return <Loader type="Rings" color="#4885E1" height={500} width={500} />;
  }

  return (
    <div className="fullList">

      <p id="hackathons-head">Search</p>
      <label className="search-container">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.9167 9.66667H10.2583L10.025 9.44167C10.8417 8.49167 11.3333 7.25833 11.3333 5.91667C11.3333 2.925 8.90833 0.5 5.91667 0.5C2.925 0.5 0.5 2.925 0.5 5.91667C0.5 8.90833 2.925 11.3333 5.91667 11.3333C7.25833 11.3333 8.49167 10.8417 9.44167 10.025L9.66667 10.2583V10.9167L13.8333 15.075L15.075 13.8333L10.9167 9.66667ZM5.91667 9.66667C3.84167 9.66667 2.16667 7.99167 2.16667 5.91667C2.16667 3.84167 3.84167 2.16667 5.91667 2.16667C7.99167 2.16667 9.66667 3.84167 9.66667 5.91667C9.66667 7.99167 7.99167 9.66667 5.91667 9.66667Z"
            fill="#C2CFE0"
          />
        </svg>
        <input
          name="searchHackathon"
          fullWidth
          className="searchBar"
          type="text"
          placeholder="Search all Hackathons"
          variant="outlined"
          onChange={handleChange}
          value={searchTerm}
        />
      </label>
      <container class="hackathon-list-header">

        {/* this is the drop down menu */}

        <div className="filter" onClick={() => {
          setDropdown(!dropdown)
        }} >
          <svg
            className="filter-icon"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
              stroke="#373F41"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>
            Filter
          </p>
          <div className={`dropdown ${dropdown ? 'showDropdown' : ''}`}>
            <div className="dropdown-content">
              <label className='filter-label'>Upcoming Hackathons
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='filter-label'>Active Hackathons
                  <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='filter-label'>Past Hackathons
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='filter-label'>Remote Hackathons
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
              <label className='filter-label'>Offline Hackathons
                <input type='checkbox' />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
        </div>
      </container >
      {
        searchTerm ? (
          <div className='cardParent' >
            {
              results.map(hackathon => (
                <HackathonCard hackathon={hackathon} />
              ))
            }

          </div>
        ) :
          <>
            <h3 className="hackathonHeaders">Upcoming Hackathons</h3>
            <div className="cardParent">
              {upcomingHackathons.map(hackathon => (
                <HackathonCard hackathon={hackathon} />
              ))
              }
            </div>
            <h3 className="hackathonHeaders">Active Hackathons</h3>
            <div className="cardParent">
              {activeHackathons.map(hackathon => (
                <HackathonCard hackathon={hackathon} />
              ))}
            </div>
            <h3 className="hackathonHeaders">Past Hackathons</h3>
            <div className="cardParent">
              {pastHackathons.map(hackathon => (
                <HackathonCard hackathon={hackathon} />
              ))}
            </div>
          </>
      }
    </div >
  );
}

export default Hackathons;