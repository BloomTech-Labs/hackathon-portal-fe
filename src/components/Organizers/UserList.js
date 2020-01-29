import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../auth0-hooks/react-auth0-spa";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { style } from "../../styles/hackathonListStyles";

// COMPONENTS
import UserModal from '../UserModal';

// ACTION
import { getSpecificHackathon, getHackers, getUser } from "../../actions/actions";

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
  Typography
} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import UserModel from "../UserModal";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#f44336"
    }
  }
});

const useStyles = makeStyles(theme => style);

const useListStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  unorderedList: {
    listStyleType: "none"
  },
  listItem: {
    transition: "0.3s",
    width: "30%",
    cursor: "pointer",
    "&:hover": {
      color: "#1a2fa6",
      transition: "0.3s"
    }
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
  }, [user_id]);

  const fn = (id) => {
    let test = hackathon.admins.find(user => {
      return id === user.user_id
    })
    if(test){
      return test.user_hackathon_role
    }
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
    : hackers.filter(hacker => {
      return hacker.username.toLowerCase().includes(searchTerm.toLowerCase());
    });

    
  if (isFetching || !hackathon || !hackers) {
    return(
      <div>Loading...</div>
    );
  }
  
  if (hackathon.organizer_id === user.id) {
    return (
      <>
        <div>
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
        </div>
        <div>
          {results.map((hacker, index) => {
            return (
              <div key={index}>
                <ul className={styles.unorderedList}>
                  <ListItemText onClick={()=>handleOpen(hacker.id)} className={styles.listItem} primary={hacker.username} secondary={fn(hacker.id)}
                  secondaryTypographyProps={{
                    color:'primary'
                  }}>
                  </ListItemText>
                </ul>
              </div>
            );
          })}
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
                <UserModel userInfo={userInfo} hackathon={hackathon} role={role} />
              </div>
            </Fade>
          </Modal>
        </div>
      </>
    );
  } else {
    return <Redirect to={`/hackathon/${hackathon.id}`} />;
  }
};

export default UserList;
