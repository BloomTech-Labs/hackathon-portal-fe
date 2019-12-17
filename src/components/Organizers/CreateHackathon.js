import React, { useState, useEffect } from 'react';
import 'date-fns';
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { Button, FormLabel, TextField, Typography, InputAdornment } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import TitleIcon from '@material-ui/icons/Title';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GroupIcon from '@material-ui/icons/Group';
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const CreateHackathon = () => {
  const [page1, setPage1] = useState(true)
  const [page1Info, setPage1Info] = useState(true)
  const [page2, setPage2] = useState(false)
  const [page2Info, setPage2Info] = useState(false)
  const [selectedDate, setSelectedDate] = useState();

  let { register, handleSubmit, errors, clearError} = useForm()

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleFormSubmit = (data, e) => {
    e.preventDefault()
    console.log('ONSUBMIT', data)
  }

  console.log(selectedDate)

  const toPage1 = () => {
    setPage1(true)
    setPage2(false)
  }

  const toPage2 = () => {
    setPage1(false)
    setPage2(true)
  }

  return(
      <div className='createHackathonContainer1'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {page1 && (
          <>
            <FormLabel>Hackathon info</FormLabel>
            <label className='hackathonName'>
              <br />
              <FormLabel>Hackathon name</FormLabel>
              <br />
              <TextField 
                type='text'
                name='hackathonName'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='hackathonLocation'>
              <br />
              <FormLabel>Hackathon location</FormLabel>
              <br />
              <TextField 
                type='text'
                name='hackathonLocation'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='hackathonURL'>
              <br />
              <FormLabel>Event URL</FormLabel>
              <br />
              <TextField 
                type='text'
                name='hackathonURL'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='pageTitle'>
              <br />
              <FormLabel>Page title</FormLabel>
              <br />
              <TextField 
                type='text'
                name='pageTitle'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='prize'>
              <br />
              <FormLabel>Prize</FormLabel>
              <br />
              <TextField 
                type='text'
                name='prize'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardGiftcardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <br />
            <div style={{ width:'8%', display:'flex', margin:'0 auto', justifyContent:'space-between' }}>
              <ArrowBackIosIcon onClick={()=>toPage1()} style={{ fontSize:'1.5rem', color:'lightGrey' }} />
              <Typography variant='h7'>Step</Typography>
              <Typography variant='h7'>1</Typography>
              <Typography variant='h7' style={{ color:'lightGrey' }} >2</Typography>
              <ArrowForwardIosIcon onClick={()=>toPage2()} style={{ fontSize:'1.5rem' }} />
            </div>
          </>
        )}
        {page2 && (
          <>
            <FormLabel>Hackathon info</FormLabel>
            <label className='teamMin'>
              <br />
              <FormLabel>Team size (min.)</FormLabel>
              <br />
              <TextField 
                type='text'
                name='teamMin'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='teamMax'>
              <br />
              <FormLabel>Team size (max.)</FormLabel>
              <br />
              <TextField 
                type='text'
                name='teamMax'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='startDate'>
              <br />
              <FormLabel>Event start date</FormLabel>
              <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name='startDate'
                  autoOk
                  margin='dense'
                  variant="inline"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  keyboardIcon={<TodayIcon style={{ color:'black' }} />}
                  inputRef={register}
                  value={selectedDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={date => handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
            </label>
            <label className='endDate'>
              <br />
              <FormLabel>Event end date</FormLabel>
              <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name='endDate'
                  autoOk
                  margin='dense'
                  variant="inline"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  keyboardIcon={<EventIcon style={{ color:'black' }} />}
                  inputRef={register}
                  value={selectedDate}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </label>
            <label className='startTime'>
              <br />
              <FormLabel>Event start time</FormLabel>
              <br />
              <TextField 
                type='text'
                name='startTime'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScheduleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <label className='endTime'>
              <br />
              <FormLabel>Event end time</FormLabel>
              <br />
              <TextField 
                type='text'
                name='endTime'
                variant="outlined"
                margin='dense'
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScheduleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </label>
            <br />
            <Button type='submit'>Submit</Button>
            <div style={{ width:'8%', display:'flex', margin:'0 auto', justifyContent:'space-between' }}>
              <ArrowBackIosIcon onClick={()=>toPage1()} style={{ fontSize:'1.5rem'}} />
              <Typography variant='h7'>Step</Typography>
              <Typography variant='h7' style={{ color:'lightGrey' }} >1</Typography>
              <Typography variant='h7'>2</Typography>
              <ArrowForwardIosIcon onClick={()=>toPage2()} style={{ fontSize:'1.5rem', color:'lightGrey'  }}/>
            </div>
          </>
        )}
        </form>
      </div>
  )
};

export default CreateHackathon;