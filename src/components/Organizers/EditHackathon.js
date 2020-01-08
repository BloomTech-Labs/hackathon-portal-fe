import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch } from 'react-redux';

// ACTIONS
import { editHackathon } from '../../actions/actions';

// STYLE
import 'date-fns';
import {
   Button,
   FormLabel,
   TextField,
   Typography,
   InputAdornment,
   makeStyles,
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
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker
} from '@material-ui/pickers';

// const useStyles = makeStyles(theme => ({}));

const EditHackathon = props => {
   const [page1, setPage1] = useState(true);
   const [page1Info, setPage1Info] = useState({});
   const [page2, setPage2] = useState(false);
   const [start_date, setStart_date] = useState(`${new Date()}`);
   const [end_date, setEnd_date] = useState(`${new Date()}`);
   const [hackathonInfo, setHackathonInfo] = useState({
      name: '',
      description: '',
      url: '',
      start_date: '',
      end_date: '',
      is_open: ''
   });
   const [state, setState] = useState({ is_open: true });
   const { loading, user } = useAuth0();
   const dispatch = useDispatch();

   let { register, handleSubmit, errors, clearError } = useForm();

   useEffect(() => {
      setHackathonInfo({
         name: `${page1Info.name}`,
         description: `${page1Info.description}`,
         url: `${page1Info.url}`,
         start_date: `${start_date}`,
         end_date: `${end_date}`,
         is_open: state.is_open
      });
   }, [page1Info, start_date, end_date, state]);

   const handlePage1Change = e => {
      setPage1Info({ ...page1Info, [e.target.name]: e.target.value });
   };

   const handleStartDateChange = date => {
      setStart_date(date.toString());
   };

   const handleEndDateChange = date => {
      setEnd_date(date.toString());
   };

   const handleOpenChange = name => e => {
      setState({ [name]: e.target.checked });
   };

   const toPage1 = () => {
      setPage1(true);
      setPage2(false);
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
      dispatch(editHackathon(id, hackathonInfo, props.history));
   };

   return (
      <div className="createHackathonContainer1">
         <form
            onSubmit={handleSubmit(handleFormSubmit)}
            style={{ width: '50%', margin: '0 auto' }}
         >
            {page1 && (
               <>
                  <FormLabel>Hackathon info</FormLabel>
                  <br />
                  <label className="name">
                     <br />
                     <FormLabel>Hackathon name</FormLabel>
                     <br />
                     <TextField
                        type="text"
                        fullWidth
                        name="name"
                        variant="outlined"
                        margin="dense"
                        defaultValue={page1Info.name}
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
                     <br />
                     <FormLabel>Hackathon description</FormLabel>
                     <br />
                     <TextField
                        type="text"
                        fullWidth
                        multiline
                        rows="4"
                        name="description"
                        variant="outlined"
                        margin="dense"
                        defaultValue={page1Info.description}
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
                  <label className="url">
                     <br />
                     <FormLabel>Event URL</FormLabel>
                     <br />
                     <TextField
                        type="text"
                        fullWidth
                        name="url"
                        variant="outlined"
                        margin="dense"
                        defaultValue={page1Info.url}
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
                  <br />
                  <div
                     style={{
                        width: '16%',
                        display: 'flex',
                        margin: '0 auto',
                        justifyContent: 'space-between'
                     }}
                  >
                     <ArrowBackIosIcon
                        onClick={() => toPage1()}
                        style={{ fontSize: '1.5rem', color: 'lightGrey' }}
                     />
                     <Typography>Step</Typography>
                     <Typography>1</Typography>
                     <Typography style={{ color: 'lightGrey' }}>2</Typography>
                     <ArrowForwardIosIcon
                        onClick={() => toPage2()}
                        style={{ fontSize: '1.5rem' }}
                     />
                  </div>
               </>
            )}
            {page2 && (
               <>
                  <FormLabel>Hackathon info</FormLabel>
                  <div>
                     <br />
                     <label className="startDate">
                        <FormLabel>Event start date</FormLabel>
                        <br />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardDatePicker
                              autoOk
                              fullWidth
                              name="startDate"
                              margin="dense"
                              inputVariant="outlined"
                              format="MM/dd/yyyy"
                              keyboardIcon={
                                 <TodayIcon style={{ color: 'black' }} />
                              }
                              inputRef={register}
                              value={start_date}
                              InputAdornmentProps={{ position: 'start' }}
                              onChange={handleStartDateChange}
                           />
                        </MuiPickersUtilsProvider>
                     </label>
                     <label className="startTime">
                        <br />
                        <FormLabel>Event start time</FormLabel>
                        <br />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardTimePicker
                              fullWidth
                              ampm={true}
                              name="startTime"
                              margin="dense"
                              inputVariant="outlined"
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
                        <br />
                        <FormLabel>Event end date</FormLabel>
                        <br />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardDatePicker
                              fullWidth
                              autoOk
                              name="endDate"
                              margin="dense"
                              inputVariant="outlined"
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
                        <br />
                        <FormLabel>Event end time</FormLabel>
                        <br />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           <KeyboardTimePicker
                              fullWidth
                              ampm={true}
                              name="endTime"
                              margin="dense"
                              inputVariant="outlined"
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
                     <label>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={state.is_open}
                                 onChange={handleOpenChange('is_open')}
                                 value="checked"
                                 color="primary"
                              />
                           }
                           label="Open hackathon (this lets participants sign up)"
                        />
                     </label>
                  </div>
                  <br />
                  <Button type="submit">Submit</Button>
                  <div
                     style={{
                        width: '16%',
                        display: 'flex',
                        margin: '0 auto',
                        justifyContent: 'space-between'
                     }}
                  >
                     <ArrowBackIosIcon
                        onClick={() => toPage1()}
                        style={{ fontSize: '1.5rem' }}
                     />
                     <Typography>Step</Typography>
                     <Typography style={{ color: 'lightGrey' }}>1</Typography>
                     <Typography>2</Typography>
                     <ArrowForwardIosIcon
                        onClick={() => toPage2()}
                        style={{ fontSize: '1.5rem', color: 'lightGrey' }}
                     />
                  </div>
               </>
            )}
         </form>
      </div>
   );
};

export default EditHackathon;