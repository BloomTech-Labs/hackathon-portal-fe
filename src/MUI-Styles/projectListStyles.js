export const style = {
  projectListWrapper: {
    width: '80%',
    margin: 'auto',
  },
  root: {
    flexDirection: 'row'
  },
  middleContent: {
    marginLeft: '0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  middleLeftContent: {
    width: '60%',
    display: 'flex'
  },
  radioGroup: {
    'flex-directon': 'row',
    width: '100%',
    textAlign: 'left'
  },
  filterRadios: {
    width: '60%'
  },
  topRadios: {
    display: 'flex'
  },
  bottomRadios: {
    display: 'flex'
  },
  projectsHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '44px',
    color: '#232323',
  },
  projectCards: {
    background: "#FFFFFF",
    border: "1px solid #858585",
    borderRadius: '4px',
    padding: '25px',
    marginTop: '20px',
    height: '400px',
    width: "350px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto'
  },
  projectTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    margin: '2% 0',
    color: '#232323',
  },
  projectDescription: {
    textAlign: 'left',
    overflow: 'hidden',
    color: '#232323',
    margin: '4% 2%',
    textOverflow: 'ellipsis'
  },
  viewMore: {
    color: '#311B92',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: ''
  },
  button: {
    background: '#311B92',
    color: '#FFFFFF',
    border: '1px solid',
    borderRadius: '4px',
    padding: '10px',
    width: '200px',
    height: '50px;',
    minHeight: '50px',
    transition: '0.5s',
    marginTop: '50px',
    textTransform: 'none',

    "&:hover": {
      backgroundColor: '#311B92',
      opacity: '0.6',
      transition: '0.2s'
    }
  },
  nameSpan: {
    display: 'inline-block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '60%',
    whiteSpace: 'nowrap',
  },
  listSpan: {
    display: 'inline-block'
  },

  'makeStyles-modal': {
    background: 'transparent',
  },
  addProjectModal: {
    marginTop: '150px'
  }
}