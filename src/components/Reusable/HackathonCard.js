import React from "react";
import { Link } from "react-router-dom";

import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

import { style } from "../../MUI-Styles/hackathonListStyles";
import '../../sass/homepage/homePage.scss'

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

const useStyles = makeStyles(theme => style);

const HackathonCard = ({ hackathon }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} hackathon-card`} key={hackathon.id}>
      <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
        <CardMedia
          className={`${classes.media} card-image`}
          image="https://source.unsplash.com/featured/?{programming},{coding}"
          id="hackathon-card"
        />
      </Link>
      <div className="content">
        <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
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
        <CardContent className={classes.root}>
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
        <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
          <Typography className={classes.details} variant="body2" component="p">
            Details
          </Typography>
        </Link>
      </div>
    </Card>
  );
};

export default HackathonCard;
