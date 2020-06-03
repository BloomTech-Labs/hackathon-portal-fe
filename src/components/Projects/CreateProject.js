// Can create a project idea for a hackathon
// Either as a organizer (with pre-approval), or as a hacker (without pre-approval)

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch, useSelector } from 'react-redux';

//ACTIONS
import { createProject } from '../../actions/actions';

// STYLE
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import {
  Button,
  Typography,
  makeStyles,
  withStyles,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import Load from '../Reusable/LoaderWithContainer';
import "../../sass/hackathonModel/hackathonModel.scss";

import { style } from '../../MUI-Styles/createProjectStyles'

const useStyles = makeStyles(theme => style)

const GreenRadio = withStyles({
  root: {
    color: 'rgba(0, 0, 0, 0.6)',
    '&$checked': {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)

const CreateProject = props => {
  const hackathon = useSelector(state => state.singleHackathon);
  const [formInfo, setFormInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [project, setProject] = useState("Solo Project");
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
  const [error, setError] = useState(false)
  const dispatch = useDispatch();
  const classes = useStyles();
  let spotsArray = Object.values(spots);
  const [match, setMatch] = useState(true)

  useEffect(() => {
    if (hackathon) {
      setProjectInfo({
        title: `${formInfo.title}`,
        description: `${formInfo.description}`,
        front_end_spots: spots.frontend,
        back_end_spots: spots.backend,
        ios_spots: spots.ios,
        android_spots: spots.and,
        ux_spots: spots.ux,
        data_science_spots: spots.ds,
        hackathon_id: hackathon.id,
        creator_id: user.id,
        is_approved: user.id === hackathon.organizer_id
      });
    }

  }, [formInfo, spots, hackathon, user.id]);



  useEffect(() => {
    if (user) {
      setCurrentUser({ ...currentUser, user_hackathon_role: 'participant', hackathon_id: `${hackathon.id}`, developer_role: `${role}` })
    }
  }, [role])

  useEffect(() => {
    if (!props.match) {
      setMatch(false)
    }
  }, [])

  const handleFormChange = e => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleChange = name => event => {
    setSpots({ ...spots, [name]: event.target.value });
  };

  const handleRoleChange = e => {
    setRole(e.target.value)
  }

  const handleTeamChange = e => {
    setProject(e.target.value)
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
    if (spotsArray.reduce((acc, curr) => acc + curr) > hackathon.max_team_participants) {
      e.preventDefault();
      setError(true)
    } else {
      e.preventDefault();
      console.log(projectInfo, currentUser)
      dispatch(createProject(hackathon.id, projectInfo, props.history))
      if (match) props.history.push(`/hackathon/${hackathon.id}/projects`)
    }
  }

  if (loading || !hackathon) {
    return (
      <Load />
    )
  } else if (!hackathon.organizer_id) {
    return (
      <Load />
    )
  }

  let selectOptions = [];
  for (let i = 0; i <= hackathon.max_team_participants; i++) {
    selectOptions.push(i)
  }

  return (
    <div className={`${classes.container} mui-modal`}>
      <form
        noValidate autoComplete="off"
        className={classes.root}
        onSubmit={handleFormSubmit}
      >
        <div className={classes.topFormContent}>
          {user.id !== hackathon.organizer_id ? (
            <>
              <Typography variant='h5'>Submit a project idea</Typography>
            </>
          ) : <Typography variant='h5'>Add a project</Typography>}
          <label className="title">
            <TextField
              required
              type="text"
              fullWidth
              label="Project name"
              name="title"
              variant="filled"
              className={classes.topInputs}
              defaultValue={formInfo.title}
              onChange={handleFormChange}
              margin="dense"
              inputProps={{
                maxLength: 30
              }}
            />
            {projectInfo.title.length === 30 ?
              <p className='errorMessage'>
                Character limit reached (30)
                </p> :
              null
            }

            <TextField
              className={classes.topInputs}
              type="text"
              fullWidth
              multiline
              rows="4"
              name="description"
              variant="filled"
              label='Project description'
              margin="dense"
              defaultValue={formInfo.description}
              onChange={handleFormChange}
              required
            />
          </label>

          <label className="project-radio">
            <FormControl component="fieldset" className={classes.radioGroup}>
              <RadioGroup
                className={classes.rgroupContainer}
                defaultValue="solo" Team Projec
                name="customized-radios">
                <FormControlLabel
                  checked={project === "Solo Project"}
                  onChange={handleTeamChange} value="Solo Project"
                  control={<GreenRadio />} label="Solo Project" />
                <FormControlLabel
                  checked={project === "Team Project"}
                  onChange={handleTeamChange}
                  value="Team Project" control={<GreenRadio />}
                  label={`Team Projects (max team of: ${hackathon.max_team_participants})`} />
              </RadioGroup>
            </FormControl>
          </label>

          {project === "Team Project" && (
            <>
              <label className={classes.maxMembers}>
                <div className={classes.topDropdowns}>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Front end</InputLabel>
                    <Select
                      name='front_end_spots'
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.frontend}
                      onChange={handleChange('frontend')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Back end</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.backend}
                      onChange={handleChange('backend')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">UX</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.ux}
                      onChange={handleChange('ux')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Data Science</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.ds}
                      onChange={handleChange('ds')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className={classes.bottomDropdowns}>
                  <FormControl className={`${classes.formControl} ${classes.iosBox}`}>
                    <InputLabel id="demo-simple-select-label">IOS</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.ios}
                      onChange={handleChange('ios')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Android</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      className='drop-down-boxes'
                      value={spots.and}
                      onChange={handleChange('and')}
                    >
                      {selectOptions.map(number => {
                        return (<MenuItem value={number}>{number}</MenuItem>)
                      })}
                    </Select>
                  </FormControl>
                </div>
              </label>

              <label className="total-members">
                <Typography gutterBottom variant="h6" component="h6">
                  Total Members: <span className={spotsArray.reduce((acc, curr) => acc + curr) > hackathon.max_team_participants ? 'max-hackers-error' : ''
                  }>{spotsArray.reduce((acc, curr) => acc + curr)}</span>
                </Typography>
              </label>


              {user.id !== hackathon.organizer_id && (
                <label className="role">
                  <Typography gutterBottom variant="h6" component="h6">
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

        </div>
        <div className={classes.addProjectButtons}>

          <Button
            variant="contained"
            className={classes.addProjectButton}
            type='submit'
            onClick={() => {
              if (props?.match?.params?.id) {
                return null;
              }
              return props.handleClose();
            }}

          >
            Add
          </Button>
        </div>
        {error && (<FormHelperText error>The total number of participants is more than the maximum number allowed per team</FormHelperText>)}

      </form>
    </div>
  )
};


export default CreateProject;  