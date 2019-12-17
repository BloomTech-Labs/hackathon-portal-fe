import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { Button, FormLabel, TextField, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const CreateHackathon = () => {
  const [page1, setPage1] = useState(true)
  const [page2, setPage2] = useState(false)

  let { register, handleSubmit, errors, clearError} = useForm()

  const handleFormSubmit = (data, e) => {
    e.preventDefault()
    console.log('ONSUBMIT', data)
  }

  const toPage1 = () => {
    setPage1(true)
    setPage2(false)
  }

  const toPage2 = () => {
    setPage1(false)
    setPage2(true)
  }

  return(
    page1 && (
      <div className='createHackathonContainer'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
      </form>
    </div>
    )
    || page2 && (
      <div className='createHackathonContainer'>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            />
          </label>
          <br />
          <div style={{ width:'8%', display:'flex', margin:'0 auto', justifyContent:'space-between' }}>
            <ArrowBackIosIcon onClick={()=>toPage1()} style={{ fontSize:'1.5rem'}} />
            <Typography variant='h7'>Step</Typography>
            <Typography variant='h7' style={{ color:'lightGrey' }} >1</Typography>
            <Typography variant='h7'>2</Typography>
            <ArrowForwardIosIcon onClick={()=>toPage2()} style={{ fontSize:'1.5rem', color:'lightGrey'  }} />
          </div>
        </form>
      </div>
    )
  )
};

export default CreateHackathon;