import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useForm from 'react-hook-form';
import { blue } from '@material-ui/core/colors';
import { useAuth0 } from '../../auth0-hooks/react-auth0-spa';
import { useDispatch } from 'react-redux';

//ACTIONS
import { createProject } from '../../actions/actions';


// STYLE
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import {
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
import RadioGroup from '@material-ui/core/RadioGroup';


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



const CreateProject = props => {

  const [formInfo, setFormInfo] = useState({});
  const [projectInfo, setProjectInfo] = useState({
    title: '',
    description: ''
  });
  const [checked, setChecked] = React.useState({
    checked: true,
  });
  const { loading, user } = useAuth0();
  const dispatch = useDispatch();
  const classes = useStyles();



  let { register, handleSubmit } = useForm();

  useEffect(() => {
    setProjectInfo({
      title: `${formInfo.title}`,
      description: `${formInfo.description}`
    });
  }, [formInfo]);


  const handleFormChange = e => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }
  const handleButtonChange = name => event => {
    setChecked({ ...checked, [name]: event.target.checked });
  };
  const handleFormSubmit = (data,e) => {
    if (loading) {
      return;
    }
    const id = user.sub.replace('auth0|', '');
    e.preventDefault();
    dispatch(createProject(id, formInfo, props.history));
  }

  return(
    <div>
           <form
            noValidate autoComplete="off"
            className={classes.root}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
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
                        label='Project Description'
                        margin="dense"
                        defaultValue={formInfo.description}
                        onChange={handleFormChange}
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
                    
                  <label className="project-radio">
                  <FormControl component="fieldset">                  
                    <RadioGroup defaultValue="solo" aria-label="project" name="customized-radios">
                        <FormControlLabel value="Solo" control={<StyledRadio />} label="Solo Project" />
                        <FormControlLabel value="Team" control={<StyledRadio />} label="Team Project" />
                    </RadioGroup>
                </FormControl>
                </label>

                <label className="max-members">
                     <Typography className={classes.text} gutterBottom variant="h5" component="h5">
                            Will there be specific roles for this project? 
                     </Typography>

                    <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="Front End"
                    />

                     <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="Back End"
                    />

                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="UX"
                    />

                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="Data Science"
                    />

                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="IOS"
                    />

                      <FormControlLabel
                        control={
                          <GreenCheckbox
                            checked={checked.checked}
                            onChange={handleButtonChange('checked')}
                            value="checked"
                          />
                        }
                        label="Android"
                    />
                </label>
                 


          </form> 
    </div>
  )
};


export default CreateProject;  