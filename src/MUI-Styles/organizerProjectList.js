import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const modalStyle = {
    root: {
        background: 'white',
        textTransform: 'none'
    },
    card: {
        maxWidth: '25%',
        margin: '0 auto',
        color: 'white',
        background: 'inherit',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        color: 'white',
    },
    pos: {
        marginBottom: 12,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        // opacity: '0.5',
        color: 'white',
        overflow: 'hidden'
    },
    test: {
        height: '100%'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    content: {
        color: 'white',
        border: '1px solid',
        borderRadius: '13.5px',
        paddingBottom: '0'
    },
    projects: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '50px'
    },
    listItem: {
        color: 'black',
        textAlign: 'left'
    }
}