import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
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
     }
}