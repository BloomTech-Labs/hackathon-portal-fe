import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: 'black'
      },
      joinButton: {
        color: 'white',
      },
}