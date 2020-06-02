// Displays a list of all active users
// Contains a search bar that can search through all users and return back matching searched results
// Only used to add organizers
// Try extracting the search function and creating its own component so it can be used outside of the UserList component

import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../auth0-hooks/react-auth0-spa";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useListStyle } from '../../MUI-Styles/userListStyles';
import Button from '@material-ui/core/Button'

// ACTION
import { getSpecificHackathon, getHackers, getUser, assignRole } from "../../actions/actions";

// STYLES
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Typography,
} from "@material-ui/core";

import '../../sass/userList/userList.scss';

import Load from '../Reusable/LoaderWithContainer';

// const useStyles = makeStyles(theme => style);

const useListStyles = makeStyles(theme => useListStyle);

const UserList = props => {
  // const classes = useStyles();
  const styles = useListStyles();
  const { user } = useAuth0();
  // const { user, loading } = useAuth0();
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

  // this finds the user role
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
  // const makeJudge = () => {
  //   dispatch(assignRole(hackathon.id, userInfo.id, { user_hackathon_role: 'judge' }, setOpen))
  // }

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

  // console.log(userInfo)


  if (isFetching || !hackathon || !hackers) {
    return (
      <Load />
    );
  }

  const organzierColor = organizer => {
    if (organizer === 'organizer') {
      return 'organizer-color'
    }
    return '';
  }

  if (hackathon.organizer_id === user.id) {
    return (
      <div className='container'>
        <div className={styles.btnWrapper}>
          <Button className={styles.backButton} id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>
          <h1 id='hackathons-head' className='organizers-header' >Add organizers</h1>
        </div>
        <div className={`${styles.searchContainer} search-container`}>
          <input
            name="searchHackathon"
            className={`${styles.searchBar} search-bar`}
            type="text"
            placeholder="Search Users"
            variant="outlined"
            onChange={handleChange}
            value={searchTerm}

          />
        </div>
        <div className={`${styles.usersList} user-list`}>
          {results.map((hacker, index) => {
            return (
              <div
                key={index}
                className={`${styles.card} card ${organzierColor(fn(hacker.id))}`}
                onClick={() => handleOpen(hacker.id)} >
                <div className='hacker-username'>
                  {hacker.username}
                </div>
                <div className='hacker-role'>
                  {fn(hacker.id)}
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