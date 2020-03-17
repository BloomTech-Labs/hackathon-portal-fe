import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

const theme = createMuiTheme();

export const style = {
    root: {
        width: '30%',
        backgroundColor: '#311B92;',
      },
      button: {
        marginRight: theme.spacing(1),
      },
      active: {
        backgroundColor: '#311B92;'
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: 'grey',
      },
      labels: {
        fontColor: '#fff',
      }
}

export const QontoConnector = withStyles({
    root: {
      background: '#311B92;'
    },
    alternativeLabel: {
      top: 10,
      width: '17px',
      left: 'calc(-63% + 16px)',
      right: 'calc(63% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#311B92;',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#311B92;',
      },
    },
    line: {
      borderColor: '#858585;',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

export const useQontoStepIconStyles = makeStyles({
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