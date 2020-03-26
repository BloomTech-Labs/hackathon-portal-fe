import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
   root: {
      height: '490px',
      backgroundColor: theme.palette.background.paper,
   },
   editinfo: {
      display: 'flex',
      flexDirection: 'column',
   },
   editdate: {
      margin: 'auto',
      width: '50%',
   },
   tabs: {
      background: '#311B92',

   },
   singleTab: {
      textTransform: 'capitalize',
   },
   button: {
      textTransform: 'none',
      background: '#311B92'
   }
}