import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useForm from 'react-hook-form';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Stepper from './Stepper';

// ACTIONS
import { createHackathon } from '../../actions/actions';

// STYLE
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import {
   Button,
   Typography,
   InputAdornment,
   makeStyles,
   withStyles,
   Checkbox,
   FormControlLabel,
   FormHelperText
} from '@material-ui/core';
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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';



const BootstrapInput = withStyles(theme => ({
   root: {
     'label + &': {
       marginTop: theme.spacing(3),
     },
   },
   input: {
     borderRadius: 3,
     position: 'relative',
     backgroundColor: theme.palette.background.paper,
     border: '1px solid #ced4da',
     fontSize: 16,
     transition: theme.transitions.create(['border-color', 'box-shadow']),
     fontFamily: [
       '-apple-system',
       'BlinkMacSystemFont',
       '"Segoe UI"',
       'Roboto',
       '"Helvetica Neue"',
       'Arial',
       'sans-serif',
       '"Apple Color Emoji"',
       '"Segoe UI Emoji"',
       '"Segoe UI Symbol"',
     ].join(','),
     '&:focus': {
       borderRadius: 4,
       borderColor: '#80bdff',
       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
     },
   },
 }))(InputBase);

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
      margin: '0 auto',
   },
   button: {
      width: '150px',
      marginTop: '50px'
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
   activeButton: {
      backgroundColor: '#4885E1',
      color: '#0A0A0B',
      marginLeft: '3%',
   },
   backButton: {
      border: '1px solid #4885E1',
      color: '#4885E1'
   },
   buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between'
   },
   buttonsSubContainer: {
      display: 'flex',
      justifyContent: 'space-between'
   }
}));

function StyledRadio(props) {
   const classes = useStyles();

   return (
      <Radio
         className={classes.root}
         disableRipple
         color="default"
         checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
         icon={<span className={classes.icon} />}
         {...props}
      />
   );
}

const CreateHackathon = props => {
   const [page1Info, setPage1Info] = useState({});
   const [start_date, setStart_date] = useState(`${new Date()}`);
   const [end_date, setEnd_date] = useState(`${new Date()}`);
   const [hackathonInfo, setHackathonInfo] = useState({
      name: '',
      description: '',
      location: '',
      url: '',
      start_date: '',
      end_date: '',
      is_open: ''
   });
   const [state, setState] = useState({ is_open: true });
   const [max, setMax] = useState('');
   const { loading, user } = useAuth0();
   const dispatch = useDispatch();
   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);

   
   let { register, handleSubmit, errors, clearError } = useForm();

   useEffect(() => {
      setHackathonInfo({
         name: `${page1Info.name}`,
         description: `${page1Info.description}`,
         location: `${page1Info.location}`,
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

   function getStepContent(step) {
      switch (step) {
         case 0:
            return 'Basic hackathon details';
         case 1:
            return 'Hackathon date and time';
         case 2:
            return 'Create projects';
         default:
            return 'Unknown step';
      }
   }


   const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
   };

   const handleChange = event => {
      setMax(event.target.value);
   };

   const handleFormSubmit = (data, e) => {
      if (loading) {
         return;
      }
      const id = user.sub.replace('auth0|', '');
      dispatch(createHackathon(id, hackathonInfo, props.history));
   };

   return (
      <div className="createHackathonContainer1" className={classes.container}>
         <Stepper 
         activeStep={activeStep}
         setActiveStep={setActiveStep}
         />
         <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
         <form
            noValidate autoComplete="off"
            className={classes.root}
            onSubmit={handleSubmit(handleFormSubmit)}
         >
            {activeStep === 0 && (
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
                        defaultValue={page1Info.name}
                        onChange={handlePage1Change}
                        inputRef={register({ required: true })}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                           )
                        }}
                     />
               
                     <TextField
                        className={classes.label}
                        type="text"
                        fullWidth
                        multiline
                        rows="4"
                        name="description"
                        variant="filled"
                        label='Hackathon Description'
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
                  <label className="location-input">

                     <TextField
                        className={classes.label}
                        type="text"
                        fullWidth
                        name="location"
                        variant="filled"
                        margin="dense"
                        label='Hackathon Location'
                        defaultValue={page1Info.location}
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
               </>
            )}
            {activeStep === 1 && (
               <>
                  <div>
                     <label className="startDate">
         

                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
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
                              label='End date'
                              margin="dense"
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
                                 value="checked"
                                 color="primary"
                              />
                           }
                           label="Open hackathon (this lets participants sign up)"
                        />
                     </label>
                  </div>
                  
                  <div>
                     <label className="max-members">
                     <Typography className={classes.text} gutterBottom variant="h5" component="h5">
                        What is the max number of members you want to allow per project?
                     </Typography>
                        <FormControl className={classes.margin}>
                           <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
                           <BootstrapInput
                           id="demo-customized-textbox" 
                           placeholder="Max: 30" 
                           onChange={handleChange}/>
                        </FormControl>
                     </label>
                  </div>

               </>
            )}
            <div className={classes.buttonsContainer}>
               {activeStep === 0 && (
                  <Button disabled style={{color:'#5F6471'}} onClick={handleBack} className={classes.disabledButton}>
               Back
               </Button>)}
               {activeStep > 0 && (
                  <Button onClick={handleBack} className={classes.backButton}>
               Back
               </Button>)}
               <div className={classes.buttonsSubContainer}>
                  {activeStep === 2 ? 
                     <Button
                     variant="contained"
                     color="primary"
                     className={classes.activeButton}
                     onClick={()=>handleFormSubmit()}
                     >
                        Finish
                     </Button>
                     :
                     <Button
                     variant="contained"
                     color="primary"
                     onClick={handleNext}
                     className={classes.activeButton}
                     >
                        Next
                     </Button>
                  }
               </div>
            </div>
         </form>
      </div>
   );
};

export default CreateHackathon;
