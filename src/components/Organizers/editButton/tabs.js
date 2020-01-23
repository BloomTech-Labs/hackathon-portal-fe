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
// console.log(hackathon);
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
console.log('this is hackathon', hackathon)
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

//  const toPage1 = () => {
//     setPage1(true);
//     setPage2(false);
//     setHackathonInfo(hackathonInfo);
//  };

//  const toPage2 = () => {
//     setPage1(false);
//     setPage2(true);
//  };

 const handleFormSubmit = (data, e) => {
    console.log(data, 'this is data');
    if (loading) {
       return;
    }
    const id = user.sub.replace('auth0|', '');
    e.preventDefault();
    dispatch(
       editHackathon(
          Number(hackathon.id),
          Number(hackathon.organizer_id),
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
      <div className="createHackathonContainer1">
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            onClick={console.log('button clicked')}
            className={classes.root}
            style={{ width: '50%', margin: '0 auto' }}
        >
                  <label className="name">
                     <TextField
                        type="text"
                        fullWidth
                        label="Hackathon Name"
                        name="name"
                        variant="filled"
                        margin="dense"
                        className={classes.label}
                        defaultValue={hackathon.name}
                        onChange={handlePage1Change}
                        inputRef={register}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <PersonIcon />
                              </InputAdornment>
                           )
                        }}
                     />
                  </label>
                  <label className="description">
                     <TextField
                        className={classes.label}
                        type="text"
                        fullWidth
                        multiline
                        rows="4"
                        name="description"
                        variant="filled"
                        margin="dense"
                        label='Hackathon Description'
                        defaultValue={hackathon.description}
                        onChange={handlePage1Change}
                        inputRef={register}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <DescriptionIcon />
                              </InputAdornment>
                           )
                        }}
                     />
                  </label>
                  <label className="location-input">
                     <TextField
                        className={classes.label}
                        type="text"
                        fullWidth
                        name="location"
                        variant="filled"
                        margin="dense"
                        label='Hackathon Location'
                        defaultValue={hackathon.location}
                        onChange={handlePage1Change}
                        inputRef={register}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <LocationOnIcon />
                              </InputAdornment>
                           )
                        }}
                     />
                  </label>

                  <label className="url">
                     <TextField
                        className={classes.label}
                        type="text"
                        fullWidth
                        name="url"
                        variant="filled"
                        label='Hackathon URL'
                        margin="dense"
                        defaultValue={hackathon.url}
                        onChange={handlePage1Change}
                        inputRef={register}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <LanguageIcon />
                              </InputAdornment>
                           )
                        }}
                     />
                  </label>
                  <Button className={classes.button} color='primary' variant='contained' type="submit" onClick={console.log('click')}>Save</Button>
        </form>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
                  <div>
                     <label className="startDate">
                      

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardDatePicker
                           className={classes.label}
                              autoOk
                              fullWidth
                              name="startDate"
                              margin="dense"
                              label='Start date'
                              inputVariant="filled"
                              format="MM/dd/yyyy"
                              keyboardIcon={
                                 <TodayIcon style={{ color: 'black' }} />
                              }
                              inputRef={register}
                              defaultValue={hackathon.start_date}
                              value={start_date}
                              InputAdornmentProps={{ position: 'start' }}
                              onChange={handleStartDateChange}
                           />
                        </MuiPickersUtilsProvider>
                     </label>
                     <label className="startTime">
                     

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardTimePicker
                            className={classes.label}
                              fullWidth
                              ampm={true}
                              name="startTime"
                              margin="dense"
                              label='Start time'
                              inputVariant="filled"
                              defaultValue={hackathon.start_date}
                              value={start_date}
                              onChange={handleStartDateChange}
                              inputRef={register}
                              keyboardIcon={
                                 <ScheduleIcon style={{ color: 'black' }} />
                              }
                              InputAdornmentProps={{ position: 'start' }}
                           />
                        </MuiPickersUtilsProvider>
                     </label>
                  </div>
                  <div>
                     <label className="endDate">
                        

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardDatePicker
                           className={classes.label}
                              fullWidth
                              autoOk
                              name="endDate"
                              margin="dense"
                              label='End date'
                              inputVariant="filled"
                              format="MM/dd/yyyy"
                              keyboardIcon={
                                 <EventIcon style={{ color: 'black' }} />
                              }
                              inputRef={register}
                              value={end_date}
                              InputAdornmentProps={{ position: 'start' }}
                              onChange={handleEndDateChange}
                           />
                        </MuiPickersUtilsProvider>
                     </label>
                     <label className="endTime">
                        

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardTimePicker
                           className={classes.label}
                              fullWidth
                              ampm={true}
                              name="endTime"
                              margin="dense"
                              label='End Time'
                              inputVariant="filled"
                              value={end_date}
                              onChange={handleEndDateChange}
                              inputRef={register}
                              keyboardIcon={
                                 <ScheduleIcon style={{ color: 'black' }} />
                              }
                              InputAdornmentProps={{ position: 'start' }}
                           />
                        </MuiPickersUtilsProvider>
                     </label>
                  </div>
                  <Button className={classes.button} color='primary' variant='contained' type="submit">Save</Button>
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