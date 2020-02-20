// A counting "stepper" that counts what step you are on in a process
// Seems to only be used on the CreateHackathon page

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#3f51b5',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#3f51b5',
    },
  },
  line: {
    borderColor: '#D0DDFF',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#D0DDFF',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    MuiStepLabelLabel: {
      color: "rgb(242, 101, 34)"
    }
  },
  active: {
    color: '#4885E1',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#4885E1',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  stepper: {
    background: 'rgb(22,22,23)'
  },
  labels: {
    fontColor: '#fff',
    
  }
}));

function getSteps() {
  return ['Hackathon basic details', 'Hackathon date and time', 'Create projects'];
}



export default function CustomizedSteppers({ activeStep, skipped, isStepOptional, isStepSkipped }) {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          return(
            <Step key={label}>
              <StepLabel className={classes.labels}
              style={{color: '#fff'}}
              StepIcon='default'
              StepIconProps={QontoStepIcon}></StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  );
}