import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
    button: {
        color: '#C21F1D',
        background: 'white',
        width: '187px',
        height: '42px',
        'font-weight': 'bold',
        'font-size': '14px',
        'font-family': 'Muli',
        border: '1px solid #C21F1D',
        'border-radius': '4px',
        'text-transform': 'none',
        "&:hover": {
          backgroundColor: "transparent"
        }
      },
}