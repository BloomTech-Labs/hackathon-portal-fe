import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHackathons } from "../actions/actions";
import { Link } from "react-router-dom";
import billNye from './images/Frame (1).png';
import test from './images/test.png';

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
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
   card: {
      background: "#1c1c1f",
      border: "1px solid #D0DDFF",
      width: "24%",
      marginBottom: "3%",
      borderRadius: "3%",
      marginRight: '0.8%'
   },
   cardParent: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: "10%",
      justifyContent: "initial"
   },
   media: {
      width: '80%',
      paddingTop: "56.25%", // 16:9
      margin: '0 auto'
   },
   expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
      })
   },
   expandOpen: {
      transform: "rotate(180deg)"
   },
   avatar: {
      backgroundColor: red[500]
   },
   searchBar: {
      width: '99%'
   },
   fullList: {
      margin: "8% 10% 0px 10%"
   },
   inputOutline: {
    // RGB FOR #9b9b9b with opacity 64%
      backgroundColor: "rgba(155, 155, 155, 0.64)",
      borderRadius: "0.75rem",
      color: "#d0ddff",
      "&$focusedOutline $notchedOutline": {
      borderColor: "#4885e1 !important"
      }
   },
   focusedOutline: {},
   notchedOutline: {
      border: "2px solid #d0ddff"
   },
   hackathonName: {
      color: "#d0ddff",
      fontWeight: "bold"
   },
   hackathonDescription: {
      color: '#d0ddff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
   },
   hackathonInfo: {
      // RGB FOR #d0ddff with opacity 64%
      color: 'rgba(208, 221, 255, 0.64)',
      marginTop: '7%'
   },
   link: {
      textDecoration: 'none'
   },
   content: {
      padding: '0 5%'
   }
}));

const searchHackathon = () => {
  //The line below recieves input and labels it as a variable called 'input'
   let input = document.getElementById("searchHackathon");
   let filter = input.value.toUpperCase();
  //eventList is the parent for all the cards
   let eventList = document.getElementsByClassName(
      "MuiPaper-root MuiPaper-elevation1 MuiCard-root makeStyles-card-2 MuiPaper-rounded"
   );
   console.log("this is eventList", eventList);
  // let span = eventList.getElementsByTagName("div");
  //this loop will go through each event name and compare them to the search input
   for (let i = 0; i < eventList.length; i++) {
      console.log("this is span", eventList);
      let a = eventList[i].getElementsByTagName("span")[0];
      console.log("this is a", a);
      let txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
      eventList[i].style.display = "";
      } else {
      eventList[i].style.display = "none";
      }
   }
};

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
            id="searchHackathon"
            fullWidth
            className={classes.searchBar}
            type="text"
            onKeyUp={searchHackathon}
            placeholder="Search Hackathons"
            variant="outlined"
            InputProps={{
               classes: {
               root: classes.inputOutline,
               focused: classes.focusedOutline,
               notchedOutline: classes.notchedOutline
               }
            }}
         ></TextField>
         <div className={classes.cardParent}>
            {hackathons.map(hackathon => {
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
                              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
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
