import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch, useSelector } from 'react-redux';

// ACTIONS
import { editHackathon, getSpecificHackathon } from '../../actions/actions';

// STYLE
import 'date-fns';
import {
   Button,
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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DateFnsUtils from '@date-io/date-fns';
import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
   label: {
      background: '#D0DDFF',
      borderRadius: '5px',
      marginBottom: '20px',
   },
   root: {
      padding: '3%',
      borderRadius: '5px',
         width: '50%',
         '& > *': {
   
           width: '100%',
         },
   },
   button: {
      width: '150px',
      marginTop: '50px'
   }
}));

const EditHackathon = props => {
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
   const classes = useStyles();


   useEffect(() => {
      dispatch(getSpecificHackathon(props.match.params.id));
   }, [dispatch, props.match.params.id]);
   
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
   

   if (isFetching || !hackathon) {
      return <div>Loading...</div>;
   }

   return (
      <div className="createHackathonContainer1">
         <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={classes.root}
            style={{ width: '50%', margin: '0 auto' }}
         >
            {page1 && (
               <>
              

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
                     <label>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 checked={state.is_open}
                                 onChange={handleOpenChange('is_open')}
                                 color="primary"
                              />
                           }
                           label="Open hackathon (this lets participants sign up)"
                        />
                     </label>
                  </div>

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

                  <Button className={classes.button} color='primary' variant='contained' type="submit">Submit</Button>
               </>
            )}
         </form>
      </div>
   );
};

export default EditHackathon;