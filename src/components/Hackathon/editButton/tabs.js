//The tabs within Hackathon Settings. Needs to be renamed from tabs.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import useForm from 'react-hook-form';
import { useAuth0 } from '../../../auth0-hooks/react-auth0-spa';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { editHackathon } from '../../../actions/actions';

// STYLE
import 'date-fns';
import {
   Button,
   TextField,
   Typography,
   Checkbox,
   FormControlLabel
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker
} from '@material-ui/pickers';


import { style } from '../../../MUI-Styles/editButton/tabsStyles'

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

const AntTabs = withStyles({
   indicator: {
      backgroundColor: '#fff',
   },
})(Tabs);

const AntTab = withStyles(theme => ({
   root: {
      textTransform: 'none',
   },
   selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => style)

export const SimpleTabs = props => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
   const dispatch = useDispatch();
   let { register, handleSubmit } = useForm();
   const hackathon = useSelector(state => state.singleHackathon);
   const [start_date, setStart_date] = useState(`${new Date()}`);
   const [end_date, setEnd_date] = useState(`${new Date()}`);
   const [hackathonInfo, setHackathonInfo] = useState();
   const [state, setState] = useState({ is_open: true });
   const { loading, user } = useAuth0();
   const [saveButton, setSaveButton] = React.useState(true);

   const enableSave = () => {
      console.log('enablesave')
      setSaveButton(false);
   }

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {
      if (hackathon) {
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

   const handleFormSubmit = (data, e) => {
      console.log(data, e, 'this is data');
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
            <AntTabs className={classes.tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
               <Tab className={classes.singleTab} label="info" {...a11yProps(0)} />
               <Tab className={classes.singleTab} label="dates" {...a11yProps(1)} />
               <Tab className={classes.singleTab} label="actions" {...a11yProps(2)} />
            </AntTabs>
         </AppBar>
         <form
            onSubmit={handleSubmit(handleFormSubmit)}
         >
            <TabPanel value={value} index={0} className={classes.editinfo}>
               <div>
                  <label className="name">
                     <TextField
                        type="text"
                        onInput={enableSave}
                        onChange={handlePage1Change}
                        fullWidth
                        label="Hackathon Name"
                        name="name"
                        variant="filled"
                        margin="dense"
                        className={classes.label}
                        defaultValue={hackathon.name}
                        inputRef={register}
                     />
                  </label>
                  <label className="url">
                     <TextField
                        className={classes.label}
                        type="text"
                        onInput={enableSave}
                        onChange={handlePage1Change}
                        fullWidth
                        name="url"
                        variant="filled"
                        label='Hackathon URL'
                        margin="dense"
                        defaultValue={hackathon.url}
                        inputRef={register}
                     />
                  </label>
                  <label className="location-input">
                     <TextField
                        className={classes.label}
                        type="text"
                        onInput={enableSave}
                        onChange={handlePage1Change}
                        fullWidth
                        name="location"
                        variant="filled"
                        margin="dense"
                        label='Hackathon Location'
                        defaultValue={hackathon.location}
                        inputRef={register}
                     />
                  </label>

                  <label className="description">
                     <TextField
                        className={classes.label}
                        type="text"
                        onInput={enableSave}
                        onChange={handlePage1Change}
                        fullWidth
                        multiline
                        rows="4"
                        name="description"
                        variant="filled"
                        margin="dense"
                        label='Hackathon Description'
                        defaultValue={hackathon.description}
                        inputRef={register}
                     />
                  </label>
                  <Button className={classes.button} color='primary' variant='contained' type="submit" disabled={saveButton}>Save</Button>
               </div>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.editdate}>
               <div >
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
                           onClickCapture={enableSave}
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
                           onClickCapture={enableSave}
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
                           onClickCapture={enableSave}
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
                           onClickCapture={enableSave}
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
               <Button className={classes.button} color='primary' variant='contained' type="submit" disabled={saveButton}>Save</Button>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.info}>
               <label>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={state.is_open}
                           onInput={enableSave}
                           onChange={handleOpenChange('is_open')}
                           color="primary"
                        />
                     }
                     label="Open hackathon (this lets participants sign up)"
                  />
               </label>
               <Button className={classes.button} variant='contained' type="submit" disabled={saveButton}>Save</Button>
            </TabPanel>
         </form>
      </div>
   );
}