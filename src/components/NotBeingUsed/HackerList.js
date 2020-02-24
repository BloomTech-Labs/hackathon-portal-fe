// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Divider from '@material-ui/core/Divider';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';

// import HackerInfoModal from './hackerInfo';

// // ACTIONS
// import { getHackers } from '../actions/actions';

// const useStyles = makeStyles(theme => ({
//    root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper
//    },
//    inline: {
//       display: 'inline'
//    }
// }));

// const HackerList = props => {
//    const isFetching = useSelector(state => state.isFetching);
//    const hackers = useSelector(state => state.hackers);
//    const classes = useStyles();
//    const dispatch = useDispatch();

//    useEffect(() => {
//       dispatch(getHackers());
//    }, [dispatch]);

//    console.log('HACKERLIST HACKERS', hackers);

//    if (isFetching) {
//       return <div>Loading</div>;
//    }

//    return (
//       <List className={classes.root}>
//          <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//             </ListItemAvatar>
//             <ListItemText
//                primary="hacker name"
//                secondary={
//                   <React.Fragment>
//                      <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                      ></Typography>
//                      "Team: " "Role: "
//                   </React.Fragment>
//                }
//             />
//             <HackerInfoModal />
//          </ListItem>

//          <Divider variant="inset" component="li" />

//          <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//             </ListItemAvatar>
//             <ListItemText
//                primary="hacker name"
//                secondary={
//                   <React.Fragment>
//                      <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                      ></Typography>
//                      "Team: " "Role: "
//                   </React.Fragment>
//                }
//             />

//             <HackerInfoModal />
//          </ListItem>

//          <Divider variant="inset" component="li" />

//          <ListItem alignItems="flex-start">
//             <ListItemAvatar>
//                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//             </ListItemAvatar>
//             <ListItemText
//                primary="hacker name"
//                secondary={
//                   <React.Fragment>
//                      <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                      ></Typography>
//                      "Team: " "Role: "
//                   </React.Fragment>
//                }
//             />

//             <HackerInfoModal />
//          </ListItem>
//       </List>
//    );
// };

// export default HackerList;
