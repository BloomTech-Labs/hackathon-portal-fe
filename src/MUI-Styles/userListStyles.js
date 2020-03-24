import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export const useListStyle = {
  container: {
    margin: '10% 10% 0 10%',

  },
  userListContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btnWrapper: {
    textAlign: 'left'
  },
  backButton: {
    color: '#311B92',
  },
  usersList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px',
    justifyContent: 'space-between'
  },
  card: {
    width: "275px",
    height: '100px',
    border: '1px solid #858585',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    borderRadius: '4px',
    margin: '20px',
    marginLeft: '0',
    marginRight: '0',
    padding: '16px',
    "&:hover": {
      color: "#4885E1",
      transition: "0.3s"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '300px',
    height: '100px',
    color: 'black',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  unorderedList: {
    listStyleType: "none",
  },
  listItem: {
    transition: "0.3s",
    cursor: "pointer",
    color: '#858585'
  },
  test: {
    variant: 'h1'
  },
  searchContainer: {
    width: '65%',
    display: 'flex',
    background: '#F5F5F5',
    color: ' #000000',
    padding: '10px 0 10px 3px',
    fontSize: '25px',
  },
  searchBar: {
    width: '100%',
    borderRadius: '4px',
    height: '25px',
    margin: 'auto',
    border: '1px solid #F5F5F5',
    background: '#F5F5F5',
    color: '#858585',
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
  },
  addButton: {
    textTransform: 'none',
    fontSize: '14px',
    background: '#311B92',
    color: 'white',
    width: '150px',
    height: '42px',
    marginLeft: '10px'
  },
  cancelButton: {
    cursor: 'pointer',
    padding: '0',
    margin: 'auto',
    marginRight: '30px',
    fontSize: '14px',
    width: '32px',
    height: '18px',
    background: '#FFFFFF',
    borderRadius: '4px',
    border: 'none',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  buttonContainer: {
    display: 'flex',
    marginTop: '10px',
    justifyContent: 'flex-end',
  }
}