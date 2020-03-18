// Displays a list of all active users
// Contains a search bar that can search through all users and return back matching searched results
// Only used to add organizers
// Try extracting the search function and creating its own component so it can be used outside of the UserList component

import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../auth0-hooks/react-auth0-spa";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { style } from "../../MUI-Styles/hackathonListStyles";
import Button from '@material-ui/core/Button'

// ACTION
import { getSpecificHackathon, getHackers, getUser, assignRole } from "../../actions/actions";

// STYLES
import {
  makeStyles,
  TextField,
  Modal, projectModal,
  Backdrop,
  Fade,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Loader from 'react-loader-spinner';

const useStyles = makeStyles(theme => style);

const useListStyles = makeStyles(theme => ({
  container: {
    margin: '10% 10% 0 10%',
  },
  userListContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btnWrapper: {
    textAlign: 'left'
  },
  usersList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px',
    justifyContent: 'space-between'
  },
  card: {
    width: "275px",
    height: '100px',
    border: '1px solid #858585',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: '4px',
    margin: '20px',
    marginLeft: '0',
    marginRight: '0',
    padding: '16px',
    "&:hover": {
      color: "#4885E1",
      transition: "0.3s"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '300px',
    height: '100px',
    color: 'black',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  unorderedList: {
    listStyleType: "none",
  },
  listItem: {
    transition: "0.3s",
    cursor: "pointer",
    color: '#858585'
  },
  test: {
    variant: 'h1'
  },
  searchContainer: {
    width: '65%',
    display: 'flex',
    background: '#F5F5F5',
    color: ' #000000',
    padding: '10px 0 10px 3px',
    fontSize: '25px',
  },
  searchBar: {
    width: '100%',
    borderRadius: '4px',
    height: '25px',
    margin: 'auto',
    border: '1px solid #F5F5F5',
    background: '#F5F5F5',
    color: '#858585',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
  },
  addButton: {
    textTransform: 'none',
    fontSize: '14px',
    background: '#311B92',
    color: 'white',
    width: '150px',
    height: '42px',
    marginLeft: '10px'
  },
  cancelButton: {
    cursor: 'pointer',
    padding: '0',
    margin: 'auto',
    marginRight: '30px',
    fontSize: '14px',
    width: '32px',
    height: '18px',
    background: '#FFFFFF',
    borderRadius: '4px',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '10px',
    justifyContent: 'flex-end',
  }
}));

const UserList = props => {
  const classes = useStyles();
  const styles = useListStyles();
  const { user, loading } = useAuth0();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userInfo);
  const hackers = useSelector(state => state.hackers);
  const hackathon = useSelector(state => state.singleHackathon);
  const isFetching = useSelector(state => state.singleisFetching);
  const [user_id, setUser_id] = useState(0);
  const [role, setRole] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getSpecificHackathon(props.match.params.id));
    dispatch(getHackers());
  }, []);

  useEffect(() => {
    if (user_id) {
      dispatch(getUser(user_id))
    }
    dispatch(getSpecificHackathon(props.match.params.id));
    dispatch(getHackers());
  }, [user_id, open]);

  const fn = (id) => {
    let test = hackathon.admins.find(user => {
      return id === user.user_id
    })
    if (test) {
      return test.user_hackathon_role
    }
  }

  const isParticipant = hackathon && userInfo && (hackathon.projects.map(project => {
    return project.participants.find(part => {
      return (part.user_id === userInfo.id)
    })
  }).filter(p => p !== undefined).length ? true : false)


  const makeOrganizer = () => {
    dispatch(assignRole(hackathon.id, userInfo.id, { user_hackathon_role: 'organizer' }, setOpen))
  }
  const makeJudge = () => {
    dispatch(assignRole(hackathon.id, userInfo.id, { user_hackathon_role: 'judge' }, setOpen))
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = (id) => {
    setOpen(true);
    setUser_id(id);
    setRole(fn(id))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const results = !searchTerm.length
    ? hackers
    : hackers ? hackers.filter(hacker => {
      return hacker.username.toLowerCase().includes(searchTerm.toLowerCase());
    }) : false

  console.log(userInfo)


  if (isFetching || !hackathon || !hackers) {
    return (
      <Loader type="Rings" color="#311B92" height={100} width={100} />
    );
  }

  if (hackathon.organizer_id === user.id) {
    return (
      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <Button id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>
          <h1 id='hackathons-head'>Add organizers</h1>
        </div>
        <div className={styles.searchContainer}>
          <input
            name="searchHackathon"
            className={styles.searchBar}
            type="text"
            placeholder="Search Users"
            variant="outlined"
            onChange={handleChange}
            value={searchTerm}

          />
        </div>
        <div className={styles.usersList}>
          {results.map((hacker, index) => {
            return (
              <div key={index} className={styles.card} onClick={() => handleOpen(hacker.id)} >

                <div className={styles.unorderedList}>
                  <ListItemText className={styles.listItem} primary={hacker.username} secondary={fn(hacker.id)}
                  >
                  </ListItemText>
                </div>
              </div>
            );
          })}
          {userInfo ? (
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={styles.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <div className={styles.paper}>
                  <div>
                    {userInfo.first_name !== null && userInfo.last_name !== null && (
                      <Typography>{`${userInfo.first_name} ${userInfo.last_name}`}</Typography>
                    )}
                    <Typography >{userInfo.username}</Typography>
                    {role && (
                      <Typography>{role}</Typography>
                    )}
                  </div>
                  <div className={styles.buttonContainer}>
                    {hackathon.organizer_id !== userInfo.id && (
                      <>
                        {fn(userInfo.id) !== 'organizer' && !isParticipant ? (
                          <>
                            <button className={styles.cancelButton} onClick={handleClose}>Cancel</button>
                            <Button className={styles.addButton} variant='contained' onClick={() => makeOrganizer()}>Add organizer</Button>
                          </>

                        ) : (
                            <>

                              <p id='admin-err'>{userInfo.username} is already associated and can't be added as an organizer.</p>
                              <button className={styles.cancelButton} onClick={handleClose}>Cancel</button>
                            </>
                          )}
                      </>
                    )}
                  </div>
                </div>
              </Fade>
            </Modal>
          ) : false}
        </div>
      </div>
    );
  } else {
    return <Redirect to={`/hackathon/${hackathon.id}`} />;
  }
};

export default UserList;