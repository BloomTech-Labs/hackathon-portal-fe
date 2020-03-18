import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
    modal: {
        margin: 'auto',
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid blue',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: 'black'
      },
      label: {
        background: '#D0DDFF',
        borderRadius: '5px',
        marginBottom: '20px',
      },
      button: {
        cursor: 'pointer',
        color: '#311B92',
        background: 'white',
        width: '187px',
        height: '42px',
        'font-weight': 'bold',
        'font-size': '14px',
        'font-family': 'Muli',
        border: '1px solid #311B92',
        'border-radius': '4px',
        'margin-bottom': '10px',
        'text-transform': 'none',
        "&:hover": {
          backgroundColor: "transparent"
        }
      },
}