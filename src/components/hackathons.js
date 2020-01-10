import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';
import { Link } from 'react-router-dom';


//material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(theme => ({
   card: {
      maxWidth: '30%',
      margin: '10%',

      background: '#1c1c1f',
      border: '1px solid #D0DDFF',
      boxSizing: 'border-box',
      borderRadius: '13.5px',
      color: '#D0DDFF'
   },
   cardparent: {
      display: 'flex',
      flexWrap: 'wrap'
   },

   media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
   },
   expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
         duration: theme.transitions.duration.shortest
      })
   },
   expandOpen: {
      transform: 'rotate(180deg)'
   },
   avatar: {
      backgroundColor: red[500]
   }
}));

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
      <div>
         <input
            name="searchHackathon"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search Hackathons"
         ></input>
         <div className={classes.cardparent}>
            {results.map(hackathon => {
               return (
                  <Card className={classes.card}>
                     <Link to={`/hackathon/${hackathon.id}`}>
                        <CardHeader
                           title={hackathon.name}
                           subheader={hackathon.start_date}
                        />

                        <CardContent>
                           <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                           >
                              {hackathon.description}
                              {/* is_open join button will be added to 1.1 when we build out a modal for a user to join hackathons */}
                              {/* {hackathon.is_open ? <button>JOIN</button> : <div className="closedHackathon">closed</div> }  */}
                           </Typography>
                        </CardContent>
                     </Link>
                  </Card>
               );
            })}
         </div>
      </div>
   );
}

export default Hackathons;
