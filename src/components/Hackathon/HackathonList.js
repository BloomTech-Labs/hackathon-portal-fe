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

import search from '../../svgs/search.svg'

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

  const searchFn = hackathonStatus => {
    if (searchTerm) {
      return hackathonStatus.filter(hackathon => hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return hackathonStatus;
  }

  const upcomingSearch = searchFn(upcomingHackathons)
  const activeSearch = searchFn(activeHackathons)
  const pastSearch = searchFn(pastHackathons);

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
    return <Loader type="Rings" color="#311B92" height={100} width={100} />;
  }

  return (
    <div className="fullList">

      <p id="hackathons-head">Search</p>
      <label className="search-container">
        <img src={search} alt='magnifying glass for search' />
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

        <div className="filter" onClick={() => {
          setDropdown(!dropdown)
        }} >
          <p>
            Filter options
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

      <h3 className="hackathonHeaders">Upcoming Hackathons</h3>
      <div className="cardParent">

        {upcomingSearch.length === 0 ? <p>Nothing to display</p> : upcomingHackathons.map(hackathon => (

          <HackathonCard hackathon={hackathon} />
        ))}
      </div>
      <h3 className="hackathonHeaders">Active Hackathons</h3>
      <div className="cardParent">

        {activeSearch.length === 0 ? <p>Nothing to display</p> : activeHackathons.map(hackathon => (

          <HackathonCard hackathon={hackathon} />
        ))}
      </div>
      <h3 className="hackathonHeaders">Past Hackathons</h3>
      <div className="cardParent">

        {pastSearch.length === 0 ? <p>Nothing to display</p> : pastHackathons.map(hackathon => (

          <HackathonCard hackathon={hackathon} />
        ))}
      </div>
    </div >
  );
}

export default Hackathons;
