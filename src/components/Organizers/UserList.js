import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../auth0-hooks/react-auth0-spa";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { style } from "../../styles/hackathonListStyles";
import Button from '@material-ui/core/Button'

// ACTION
import { getSpecificHackathon, getHackers, getUser, assignRole } from "../../actions/actions";

// STYLES
import {
  makeStyles,
  TextField,
  Modal,
  Backdrop,
  Fade,
  createMuiTheme,
  FormHelperText,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";

const useStyles = makeStyles(theme => style);

const useListStyles = makeStyles(theme => ({
  container: {
    margin: '10% 10% 0 10%',
  },
  userListContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnWrapper: {
    textAlign: 'left'
  },
  usersList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px',
    justifyContent: 'initial'
  },
  card: {
    width: "250px",
    height: '250px',
    border: '1px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5%',
    margin: '20px',
    "&:hover": {
      color: "#4885E1",
      transition: "0.3s"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '200px',
    height: '200px',
    color: 'black',
    display: 'flex',
justifyContent: 'center',
alignItems: 'center',
flexDirection: 'column',
  },
  unorderedList: {
    listStyleType: "none",
  },
  listItem: {
    transition: "0.3s",
    cursor: "pointer",
  },
  test: {
    variant:'h1'
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
    if(user_id){
      dispatch(getUser(user_id))
    }
    dispatch(getSpecificHackathon(props.match.params.id));
    dispatch(getHackers());
  }, [user_id, open]);

  const fn = (id) => {
    let test = hackathon.admins.find(user => {
      return id === user.user_id
    })
    if(test){
      return test.user_hackathon_role
    }
  } 

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

    
  if (isFetching || !hackathon || !hackers) {
    return(
      <div>Loading...</div>
    );
  }
  
  if (hackathon.organizer_id === user.id) {
    return (
      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <p id='hackathons-head'>Add an Organizer</p>
      <Button id='view-archive-btn' onClick={() => props.history.push(`/hackathon/${hackathon.id}`)}>Back</Button>
      </div>
        <div>
          <TextField
            name="searchHackathon"
            fullWidth
            className={classes.searchBar}
            type="text"
            placeholder="Search Users"
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
        </div>
        <div className={styles.usersList}>
          {results.map((hacker, index) => {
            return (
              <div key={index} className={styles.card} onClick={()=>handleOpen(hacker.id)} >
                
                <div className={styles.unorderedList}>
                <i class="material-icons">
person_outline
</i>
                  <ListItemText className={styles.listItem} primary={hacker.username} secondary={fn(hacker.id)}
                  secondaryTypographyProps={{
                    color:'primary'
                  }}>
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
                      <i class="material-icons">
                      person_outline
                      </i>
                    {userInfo.first_name !== null && userInfo.last_name !== null && (
                      <Typography>{`${userInfo.first_name} ${userInfo.last_name}`}</Typography>
                     )}
                      <Typography >{userInfo.username}</Typography>
                    {role && (
                      <Typography>{role}</Typography>
                    )}
                    {hackathon.organizer_id !== userInfo.id && (
                      <>
                        {fn(userInfo.id) !== 'organizer' && (
                        <>
                          <Button color='primary' variant='contained' onClick={() => makeOrganizer()}>Set as organizer</Button>
                        </>
                        )}
                      </>
                    )}
                </div>
              </Fade>
          </Modal>
          ):false}
        </div>
      </div>
    );
  } else {
    return <Redirect to={`/hackathon/${hackathon.id}`} />;
  }
};

export default UserList;