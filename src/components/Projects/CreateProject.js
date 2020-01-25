import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { blue } from '@material-ui/core/colors';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch, useSelector } from 'react-redux';

//ACTIONS
import { createProject, getSpecificHackathon } from '../../actions/actions';

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

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';


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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


  const GreenCheckbox = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600],
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  const GreenRadio = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600],
      },
    },
    checked: {},
  })(props => <Radio color="default" {...props} />);

const CreateProject = props => {
  const hackathon = useSelector(state => state.singleHackathon);
  const [formInfo, setFormInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [project, setProject] = useState( "Solo Project" );
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: '',
    front_end_spots: 0,
    back_end_spots: 0,
    ios_spots: 0,
    android_spots: 0,
    ux_spots: 0,
    data_science_spots: 0
  });
  const [spots, setSpots] = React.useState({
    frontend: 0,
    backend: 0,
    ux: 0,
    ds: 0,
    ios: 0,
    and: 0
  });
  const [checked, setChecked] = React.useState({
    frontend: false,
    backend: false,
    ux: false,
    ds: false,
    ios: false,
    and: false,
  });
  const [role, setRole] = useState(" ")
  const { loading, user } = useAuth0();
  const dispatch = useDispatch();
  const classes = useStyles();
  let spotsArray = Object.values(spots);

  useEffect(() => {
    dispatch(getSpecificHackathon((props.match.params.id)));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if(hackathon) {
      setProjectInfo({
        title: `${formInfo.title}`,
        description: `${formInfo.description}`,
        front_end_spots: spots.frontend,
        back_end_spots: spots.backend,
        ios_spots: spots.ios,
        android_spots: spots.and,
        ux_spots: spots.ux,
        data_science_spots: spots.ds,
        creator_id: currentUser.id,
        hackathon_id: hackathon.id,
        creator_id: currentUser.id
      });
    }
  }, [formInfo, spots]);

  useEffect(() => {
    if(user) {
      setCurrentUser({...currentUser, user_hackathon_role: 'participant', hackathon_id: `${hackathon.id}`, developer_role: `${role}`})
    }
  }, [role])

  const handleFormChange = e => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }


  const handleButtonChange = name => event => {
    setChecked({ ...checked, [name]: event.target.checked  });
  };

  const handleChange = name => event => {
    setSpots({...spots, [name]:event.target.value});
  };

  const handleRoleChange = e => {
    setRole( e.target.value)
  }

  const handleTeamChange = e => {
    setProject( e.target.value )
  }

  useEffect(() => {
    if (user) {
      setCurrentUser({ id: user.id, username: user.username });
    }
  }, [user]);

  const handleFormSubmit = e => {
    if (loading) {
      return;
    }
    if(spotsArray.reduce((acc, curr) => acc + curr) > hackathon.max_team_participants){
      e.preventDefault();
      console.log('ERROR: the total number of participants is more than the maximum number allowed per team')
    }else{
      e.preventDefault();
      console.log(projectInfo, currentUser)
      dispatch(createProject(hackathon.id, projectInfo, props.history))
    }
  }
  
  if(loading || !hackathon){
    return(
      <div>Loading...</div>
      )
  }else if(!hackathon.organizer_id){
    return(
      <div>Loading...</div>
      )
    }
    
    let selectOptions = [];
    for(let i=0; i <= hackathon.max_team_participants; i++){
      selectOptions.push(i)
    }

  return(
    <div>
      <form
      noValidate autoComplete="off"
      className={classes.root}
      onSubmit={handleFormSubmit}
      >
        {user.id !== hackathon.organizer_id ? (
          <>
            <Typography variant='h5'>Submit a project idea</Typography>
            <Typography variant='subheader'>note: only one project idea can be submitted per user; if accepted, you will automatically be placed onto the project as your desired role</Typography>
          </>
        ): <Typography variant='h5'>Submit a project</Typography>}
        <label className="title">
            <TextField
              type="text"
              fullWidth
              label="Project Title"
              name="title"
              variant="filled"
              margin="dense"
              className={classes.label}
              defaultValue={formInfo.title}
              onChange={handleFormChange}
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
              label='Project Description'
              margin="dense"
              defaultValue={formInfo.description}
              onChange={handleFormChange}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <DescriptionIcon />
                    </InputAdornment>
                  )
              }}
            />
        </label>
          
        <label className="project-radio">
        <FormControl component="fieldset">                  
          <RadioGroup defaultValue="solo" aria-label="project" name="customized-radios">
              <FormControlLabel checked={project === "Solo Project"} onChange={handleTeamChange} value="Solo Project" control={<GreenRadio />} label="Solo Project" />
              <FormControlLabel checked={project === "Team Project"} onChange={handleTeamChange} value="Team Project" control={<GreenRadio />} label="Team Project" />
          </RadioGroup>
      </FormControl>
      </label>
        
        {project === "Team Project" && (
        <>
          <label className="max-members">
              <Typography  gutterBottom variant="h5" component="h5">
                    Will there be specific roles for this project? 
              </Typography>
  
            <FormControlLabel
                control={
                  <GreenCheckbox
                    name='frontend'
                    checked={checked.frontend}
                    onChange={handleButtonChange('frontend')}
                    value="checked"
                  />
                }
                label="Front End"
            />
  
            {checked.frontend && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  name='front_end_spots'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.frontend}
                  onChange={handleChange('frontend')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
  
            <FormControlLabel
                control={
                  <GreenCheckbox
                    name='backend'
                    checked={checked.backend}
                    onChange={handleButtonChange('backend')}
                    value="checked"
                  />
                }
                label="Back End"
            />
  
              {checked.backend && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.backend}
                  onChange={handleChange('backend')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
  
              <FormControlLabel
                control={
                  <GreenCheckbox
                    name='ux'
                    checked={checked.ux}
                    onChange={handleButtonChange('ux')}
                    value="checked"
                  />
                }
                label="UX"
            />
  
              {checked.ux && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.ux}
                  onChange={handleChange('ux')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
  
              <FormControlLabel
                control={
                  <GreenCheckbox
                    name='ds'
                    checked={checked.ds}
                    onChange={handleButtonChange('ds')}
                    value="checked"
                  />
                }
                label="Data Science"
            />
  
              {checked.ds && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.ds}
                  onChange={handleChange('ds')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
  
              <FormControlLabel
                control={
                  <GreenCheckbox
                    name='ios'
                    checked={checked.ios}
                    onChange={handleButtonChange('ios')}
                    value="checked"
                  />
                }
                label="IOS"
            />
  
              {checked.ios && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.ios}
                  onChange={handleChange('ios')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
  
              <FormControlLabel
                control={
                  <GreenCheckbox
                    name='and'
                    checked={checked.and}
                    onChange={handleButtonChange('and')}
                    value="checked"
                  />
                }
                label="Android"
                />
                
                {checked.and && (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Max</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={spots.and}
                  onChange={handleChange('and')}
                >
                  {selectOptions.map(number => {
                    return (<MenuItem value={number}>{number}</MenuItem>)
                  })}
                </Select>
              </FormControl>
            )}
          </label>
  
          <label className="total-members">
          <Typography  gutterBottom variant="h6" component="h6">
            Total Members: {spotsArray.reduce((acc, curr) => acc + curr)}
          </Typography>
          </label>


          { user.id !== hackathon.organizer_id && (
          <label className="role">
          <Typography  gutterBottom variant="h6" component="h6">
            Your Role:
          </Typography>

          <FormControl className={classes.formControl}>
        <Select value={role} onChange={handleRoleChange} displayEmpty className={classes.selectEmpty}>
          <MenuItem value="" disabled>
            Role
          </MenuItem>
          <MenuItem value={"frontend"}>Frontend</MenuItem>
          <MenuItem value={"backend"}>Backend</MenuItem>
          <MenuItem value={"ux"}>UX</MenuItem>
          <MenuItem value={"ds"}>Data Science</MenuItem>
          <MenuItem value={"ios"}>IOS</MenuItem>
          <MenuItem value={"and"}>Android</MenuItem>
        </Select>
        <FormHelperText>Role</FormHelperText>
      </FormControl>
          </label>
          )}
    </>
      )}
      <Button
      variant="contained"
      color="primary"
      className={classes.activeButton}
      type='submit'
      >
      Finish
      </Button>

      </form> 
    </div>
  )
};


export default CreateProject;  