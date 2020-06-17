// A counting "stepper" that counts what step you are on in a process
// Seems to only be used on the CreateHackathon page
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';

import { style, QontoConnector, useQontoStepIconStyles } from '../../MUI-Styles/stepperStyles';


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


const useStyles = makeStyles(theme => style)

function getSteps() {
  return ['Hackathon basic details', 'Hackathon date and time', 'Create projects'];
}



export default function CustomizedSteppers({ activeStep, skipped, isStepOptional, isStepSkipped }) {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className={classes.circle}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel className={classes.labels}
                style={{ color: '#858585' }}
                StepIcon='default'
                StepIconProps={QontoStepIcon}></StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  );
}