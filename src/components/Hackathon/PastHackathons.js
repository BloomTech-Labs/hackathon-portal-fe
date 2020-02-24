// Displays a list of hackathons that have already taken place
// Combine hackathons.js with pastHackathons.js
// Has a search function to find past hackathons
// Try to extract search function and create its own component

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../../actions/actions';
import { Link } from 'react-router-dom';
import billNye from '../../images/Frame (1).png';
import { style } from '../../styles/hackathonListStyles';
import moment from 'moment';

//material UI
import {
   makeStyles,
   Card,
   CardHeader,
   CardContent,
   CardMedia,
   Typography,
   TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';


const useStyles = makeStyles(theme => style);

const formatDate = date => {
   const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
   ];
   const newDate = new Date(date);
   const y = newDate.getFullYear();
   const d = newDate.getDate();
   const m = months[newDate.getMonth()];
   return `${m} ${d}, ${y}`;
};

const PastHackathons = (props) => {

   const classes = useStyles();
   const isFetching = useSelector(state => state.isFetching);
   const dispatch = useDispatch();
   const hackathons = useSelector(state => state.hackathons);
   const [searchTerm, setSearchTerm] = React.useState('');
   const currentDate = new Date().toString();

   const handleChange = event => {
      setSearchTerm(event.target.value);
   };

   useEffect(() => {
      dispatch(getHackathons()); 
   }, [dispatch]);


   let pastHackathons = hackathons ? (hackathons.filter(hackathon => {
      if (moment(hackathon.end_date).isBefore(currentDate)) {
         return hackathon;
      }
   })) : [];



  

   const results = !searchTerm.length
      ? pastHackathons
      : pastHackathons.filter(hackathon =>
         hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         hackathon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
         formatDate(hackathon.start_date).toLowerCase().includes(searchTerm.toLowerCase())
        );
   if (isFetching || !hackathons) {
      return <Loader type="Rings" color="#4885E1" height={100} width={100} />;
   }
   console.log(results)


 

   return (
      <div className={classes.fullList}>
           <p id='hackathons-head'>Past Hackathons</p>
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

<container class='hackathon-list-header'>
        
        <div className='hackathon-buttons'>
           <Button id='view-archive-btn' onClick={() => props.history.push('/hackathons')}>View Upcoming Hackathons</Button>
        </div>

      </container>
        
         <div className={classes.cardParent}>
            {results.map(hackathon => {
               return (
                  <Card className={classes.pastCard} key={hackathon.id}>
                     <Link
                        to={`/hackathon/${hackathon.id}`}
                        className={classes.link}
                     >
                        <CardMedia className={classes.media} image={billNye} />
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
                                 <Typography variant="body2" component="p">
                                    {hackathon.location}
                                 </Typography>
                                 <Typography variant="body2" component="p">
                                    Start Date:{' '}
                                    {formatDate(hackathon.start_date)}
                                 </Typography>
                                 <Typography variant='body2'>
                                     CLOSED
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

export default PastHackathons;
