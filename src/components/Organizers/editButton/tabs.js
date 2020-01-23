import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SwitchLabels from './switch';

import EditHackathon from '../EditHackathon';

import useForm from 'react-hook-form';
import { useAuth0 } from '../../../auth0-hooks/react-auth0-spa';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { editHackathon, getSpecificHackathon } from '../../../actions/actions';

// STYLE
import 'date-fns';
import {
   Button,
   TextField,
   Typography,
   InputAdornment,
//    makeStyles,
   Checkbox,
   FormControlLabel
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';
import LanguageIcon from '@material-ui/icons/Language';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker
} from '@material-ui/pickers';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const SimpleTabs = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  let { register, handleSubmit } = useForm();
  const isFetching = useSelector(state => state.isFetching);
  const hackathon = useSelector(state => state.singleHackathon);
  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [start_date, setStart_date] = useState(`${new Date()}`);
  const [end_date, setEnd_date] = useState(`${new Date()}`);
  const [hackathonInfo, setHackathonInfo] = useState();
  const [state, setState] = useState({ is_open: true });
  const { loading, user } = useAuth0();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log(hackathon);
console.log(props, 'this is props');
//   useEffect(() => {
//     dispatch(getSpecificHackathon(hackathon.id));
//  }, [dispatch, hackathon.id]);
 
 useEffect(() => {
  if(hackathon) {
    setStart_date(`${hackathon.start_date}`)
    setEnd_date(`${hackathon.end_date}`)
    setState({ is_open: hackathon.is_open })
  }
 }, [hackathon])

 const handlePage1Change = e => {
    setHackathonInfo({ ...hackathonInfo, [e.target.name]: e.target.value });
 };

 const handleStartDateChange = date => {
    setStart_date(date.toString());
    setHackathonInfo({ ...hackathonInfo, start_date: date.toString() });
 };

 const handleEndDateChange = date => {
    setEnd_date(date.toString());
    setHackathonInfo({ ...hackathonInfo, end_date: date.toString() });
 };

 const handleOpenChange = name => e => {
    setState({ [name]: e.target.checked });
    setHackathonInfo({ ...hackathonInfo, [name]: e.target.checked });
 };

 const toPage1 = () => {
    setPage1(true);
    setPage2(false);
    setHackathonInfo(hackathonInfo);
 };

 const toPage2 = () => {
    setPage1(false);
    setPage2(true);
 };

 const handleFormSubmit = (data, e) => {
    if (loading) {
       return;
    }
    const id = user.sub.replace('auth0|', '');
    e.preventDefault();
    dispatch(
       editHackathon(
          Number(props.match.params.id),
          Number(id),
          props.history,
          hackathonInfo
       )
    );
 };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="info" {...a11yProps(0)} />
          <Tab label="dates" {...a11yProps(1)} />
          <Tab label="actions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <EditHackathon/> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
            <h3>set hackathon</h3>
            <p>this will allow users to enter the hackathon</p>
            <span>CLOSED</span><SwitchLabels/><span>OPEN</span>
        </div>
        <div>
            <h3>allow project idea submission</h3>
            <p>this will allow users to begin submitting ideas</p>
            <span>OFF</span><SwitchLabels/><span>ON</span>
        </div>
      </TabPanel>
    </div>
  );
}