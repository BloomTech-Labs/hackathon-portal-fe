// A counting "stepper" that counts what step you are on in a process
// Seems to only be used on the CreateHackathon page

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';

const QontoConnector = withStyles({
  root: {
    background: 'grey'
  },
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: 'grey',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'grey',
    },
  },
  line: {
    borderColor: 'black',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: 'green',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    MuiStepLabelLabel: {
      color: "green"
    }
  },
  active: {
    background: 'green',
  },
  circle: {
    background: 'green',
    width: 8,
    height: 8,
    borderRadius: '50%',

  },
  completed: {
    background: 'green',
    color: 'yellow',
    zIndex: 1,
    fontSize: 18,
  }
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
    width: '30%',
    backgroundColor: 'grey',
  },
  button: {
    marginRight: theme.spacing(1),
    // backgroundColor: 'grey',
  },
  active: {
    backgroundColor: 'grey'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: 'grey',
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
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />} className={classes.circle}>
        {steps.map((label, index) => {
          const stepProps = {};
          return (
            <Step key={label}>
              <StepLabel className={classes.labels}
                style={{ color: '#fff' }}
                StepIcon='default'
                StepIconProps={QontoStepIcon}></StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </div>
  );
}