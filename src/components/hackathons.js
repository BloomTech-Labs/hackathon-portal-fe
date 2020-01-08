import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHackathons } from '../actions/actions';


//material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
   card: {
      
      maxWidth: '30%',
      margin: '10%',

      background: '#1c1c1f',
      border: '1px solid #D0DDFF',
      boxSizing: 'border-box',
      borderRadius: '13.5px',
      color: '#D0DDFF',


   },
   cardparent: {
    display: 'flex',
    flexWrap: 'wrap',
    
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

const searchHackathon = () => {
   //The line below recieves input and labels it as a variable called 'input'
   let input = document.getElementById("searchHackathon");
   let filter = input.value.toUpperCase();
   //eventList is the parent for all the cards 
   let eventList = document.getElementsByClassName("MuiPaper-root MuiPaper-elevation1 MuiCard-root makeStyles-card-2 MuiPaper-rounded");
   console.log('this is eventList', eventList);
   // let span = eventList.getElementsByTagName("div");
   //this loop will go through each event name and compare them to the search input
   for (let i = 0; i < eventList.length; i++) {
       console.log('this is span', eventList);
       let a = eventList[i].getElementsByTagName("span")[0];
       console.log('this is a', a);
       let txtValue = a.textContent || a.innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         eventList[i].style.display = "";
       } else {
         eventList[i].style.display = "none";
       }
   };
};

function Hackathons(props) {
   const classes = useStyles();
   const isFetching = useSelector(state => state.isFetching);
   const dispatch = useDispatch();
   const hackathons = useSelector(state => state.hackathons);

   console.log(hackathons);

   useEffect(() => {
      dispatch(getHackathons());
   }, []);

   if (isFetching) {
      return <h2>Loading Events...</h2>;
   }

   return (
      <div>
         <input id='searchHackathon' 
            type='text' 
            onKeyUp={searchHackathon} 
            placeholder='Search Hackathons'>
         </input>
         <div className={classes.cardparent}>
            {hackathons.map(hackathon => {
               return (
                  <Card className={classes.card}>
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
                           <br></br>
                           {/* is_open join button will be added to 1.1 when we build out a modal for a user to join hackathons */}
                           {/* {hackathon.is_open ? <button>JOIN</button> : <div className="closedHackathon">closed</div> }  */}

                           
                        </Typography>
                     </CardContent>
                  </Card>
               );
            })}
         </div>
      </div>
   );
}

export default Hackathons;
