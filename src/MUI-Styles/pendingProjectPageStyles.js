import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const style = {
    pendingContainer: {
        width: '80%',
        margin: 'auto',
    },
    pendingProjectCard: {
        padding: '25px',
        width: '20%',
        height: '250px',
        margin: '20px',
        background: "white",
        border: "1px solid black",
        width: "250px",
        borderRadius: "4px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    h3: {
        margin: ' 0 0 5px',
        fontSize: '22px',
        fontWeight: 'bold',
    },
    description: {
        // height: '164px'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    approve: {
        cursor: 'pointer',
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#311B92',
        background: 'white',
        border: '1px solid white'
    },
    disapprove: {
        cursor: 'pointer',
        fontFamily: 'Muli',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#858585',
        background: 'white',
        border: '1px solid white',
        marginRight: '10px'
    },
    backButton: {
        color: '#311B92',
        textTransform: 'none'
    }
}