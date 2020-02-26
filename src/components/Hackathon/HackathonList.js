// Displays a list of all hackathons
// Has a search function to find hackathons
// Try to extract search function and create its own component
// Don't forget to delete past hackathons page
// Take out the upcoming hackathon component and make it a reuseable

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons } from "../../actions/actions";
import { Link } from "react-router-dom";
import logo3 from "../../images/logo3.png";
import { style } from "../../styles/hackathonListStyles";
import moment from "moment";

//material UI
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";

const useStyles = makeStyles(theme => style);
// const NewTextField = withStyles(styledTextField)

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
  const classes = useStyles();
  const isFetching = useSelector(state => state.isFetching);
  const dispatch = useDispatch();
  const hackathons = useSelector(state => state.hackathons);
  const [searchTerm, setSearchTerm] = React.useState("");
  const currentDate = new Date().toString();

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

  console.log(upcomingHackathons);
  console.log(pastHackathons);

  const results = !searchTerm.length
    ? upcomingHackathons
    : upcomingHackathons.filter(
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
    return <Loader type="Rings" color="#4885E1" height={100} width={100} />;
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
          // InputProps={{
          //    classes: {
          //       root: classes.inputOutline,
          //       focused: classes.focusedOutline,
          //       notchedOutline: classes.notchedOutline
          //    }
          // }}
        />
      </label>
      <container class="hackathon-list-header">
        {/* <div className='hackathon-buttons'>
           <Button id='view-archive-btn' onClick={() => props.history.push('hackathons/archive')}>View Past Hackathons</Button>
        </div> */}

        <div className="filter">
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
          <p
            id="view-archive-btn"
            onClick={() => props.history.push("hackathons/archive")}
          >
            Filter
          </p>
        </div>
      </container>

      <h3 className="hackathonHeaders">Upcoming Hackathons</h3>
      <div className="cardParent">
        {upcomingHackathons.map(hackathon => {
          return (
            <Card className={classes.card} key={hackathon.id}>
              <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/300/300"
                  id="hackathon-card"
                />
              </Link>
              <div className="content">
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <CardHeader
                    title={hackathon.name}
                    className={classes.hackathonName}
                    titleTypographyProps={{
                      classes: {
                        root: classes.hackathonName
                      }
                    }}
                  />
                </Link>
                <CardContent>
                  <div className="hackathonInfo">
                    <Typography variant="body2" component="p">
                      {hackathon.location}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Start Date: {formatDate(hackathon.start_date)}
                    </Typography>
                    <Typography variant="body2" component="p">
                      End Date: {formatDate(hackathon.end_date)}
                    </Typography>
                    {hackathon.is_open === false ? <div>CLOSED</div> : null}
                  </div>
                </CardContent>
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <Typography
                    className={classes.details}
                    variant="body2"
                    component="p"
                  >
                    Details
                  </Typography>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
      <h3 className="hackathonHeaders">Active Hackathons</h3>
      <div className="cardParent">
        {activeHackathons.map(hackathon => {
          return (
            <Card className={classes.card} key={hackathon.id}>
              <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/300/300"
                  id="hackathon-card"
                />
              </Link>
              <div className="content">
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <CardHeader
                    title={hackathon.name}
                    className={classes.hackathonName}
                    titleTypographyProps={{
                      classes: {
                        root: classes.hackathonName
                      }
                    }}
                  />
                </Link>
                <CardContent>
                  {/* <Typography
                                 variant="body2"
                                 component="p"
                                 className={classes.hackathonDescription}
                              >
                                 {hackathon.description}
                              </Typography> */}
                  <div className="hackathonInfo">
                    <Typography variant="body2" component="p">
                      {hackathon.location}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Start Date: {formatDate(hackathon.start_date)}
                    </Typography>
                    <Typography variant="body2" component="p">
                      End Date: {formatDate(hackathon.end_date)}
                    </Typography>
                    {hackathon.is_open === false ? <div>CLOSED</div> : null}
                  </div>
                </CardContent>
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <Typography
                    className={classes.details}
                    variant="body2"
                    component="p"
                  >
                    Details
                  </Typography>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
      <h3 className="hackathonHeaders">Past Hackathons</h3>
      <div className="cardParent">
        {pastHackathons.map(hackathon => {
          return (
            <Card className={classes.card} key={hackathon.id}>
              <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
                <CardMedia
                  className={classes.media}
                  image="https://picsum.photos/300/300"
                  id="hackathon-card"
                />
              </Link>
              <div className="content">
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <CardHeader
                    title={hackathon.name}
                    className={classes.hackathonName}
                    titleTypographyProps={{
                      classes: {
                        root: classes.hackathonName
                      }
                    }}
                  />
                </Link>
                <CardContent>
                  {/* <Typography
                                 variant="body2"
                                 component="p"
                                 className={classes.hackathonDescription}
                              >
                                 {hackathon.description}
                              </Typography> */}
                  <div className="hackathonInfo">
                    <Typography variant="body2" component="p">
                      {hackathon.location}
                    </Typography>
                    <Typography variant="body2" component="p">
                      Start Date: {formatDate(hackathon.start_date)}
                    </Typography>
                    <Typography variant="body2" component="p">
                      End Date: {formatDate(hackathon.end_date)}
                    </Typography>
                    {hackathon.is_open === false ? <div>CLOSED</div> : null}
                  </div>
                </CardContent>
                <Link
                  to={`/hackathon/${hackathon.id}`}
                  className={classes.link}
                >
                  <Typography
                    className={classes.details}
                    variant="body2"
                    component="p"
                  >
                    Details
                  </Typography>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Hackathons;
