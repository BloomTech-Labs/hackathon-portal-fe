import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons } from "../actions/actions";
import { Link } from "react-router-dom";
import billNye from './images/Frame (1).png';
import { style } from '../styles/hackathonListStyles'


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

const useStyles = makeStyles(theme => (style));

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
   const [searchTerm, setSearchTerm] = React.useState('');

   const handleChange = event => {
      setSearchTerm(event.target.value);
   };

   useEffect(() => {
      dispatch(getHackathons());
   }, []);

   const results = !searchTerm.length
      ? hackathons
      : hackathons.filter(hackathon =>
         hackathon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

   if (isFetching || !hackathons) {
      return <h2>Loading Events...</h2>;
   }

   return (
      <div className={classes.fullList}>
         <TextField
            name="searchHackathon"
            fullWidth
            className={classes.searchBar}
            type="text"
            placeholder="Search Hackathons"
            variant="outlined"
            onChange={handleChange}
            value={searchTerm}
            InputProps={{
               classes: {
               root: classes.inputOutline,
               focused: classes.focusedOutline,
               notchedOutline: classes.notchedOutline
               }
            }}
         ></TextField>
         <div className={classes.cardParent}>
            {results.map(hackathon => {
               return (
                  <Card className={classes.card}>
                     <Link to={`/hackathon/${hackathon.id}`} className={classes.link}>
                        <CardMedia
                        className={classes.media}
                        image={billNye}
                        />
                        <div className={classes.content}>
                           <CardHeader
                           title={hackathon.name}
                           className={classes.hackathonName}
                           titleTypographyProps={{
                              classes: {
                                 root: classes.hackathonName
                              }
                           }}
                           />
                           <CardContent>
                              <Typography
                                 variant="body2"
                                 component="p"
                                 className={classes.hackathonDescription}
                              >
                                 {hackathon.description}
                              </Typography>
                              <div className={classes.hackathonInfo}>
                                 <Typography
                                    variant="body2"
                                    component="p"
                                 >
                                    {hackathon.location}
                                 </Typography>
                                 <Typography
                                    variant="body2"
                                    component="p"
                                 >
                                    Start Date: {formatDate(hackathon.start_date)}
                                 </Typography>
                              </div>
                              {/* is_open join button will be added to 1.1 when we build out a modal for a user to join hackathons */}
                              {/* {hackathon.is_open ? <button>JOIN</button> : <div className="closedHackathon">closed</div> }  */}
                           </CardContent>
                        </div>
                     </Link>
                  </Card>
               );
            })}
         </div>
      </div>
   );
}

export default Hackathons;
