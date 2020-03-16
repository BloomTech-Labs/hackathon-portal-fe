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
    width: '50%',
    display: 'flex'
  },
  radioGroup: {
    // border: '2px solid green',
    // display: 'flex',
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
    // marginLeft: '30px'
  },
  projectCards: {
    background: "#FFFFFF",
    border: "1px solid #858585",
    borderRadius: '4px',
    padding: '25px',
    marginTop: '20px',
    height: '400px',
    width: "350px",
    borderRadius: "4px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: {
    // border: '1px solid blue'
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
    "&:hover": {
      color: '#4885E1'
    }
  },
  nameSpan: {
    display: 'inline-block',
    // height: '100%',
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
  }

  // projectcard: {
  //     padding: '25px',
  //     height: '250px',
  //      margin: '20px',
  //     background: "#1c1c1f",
  //     border: "1px solid #D0DDFF",
  //      width: "250px",
  //     borderRadius: "3%",
  // },
  // h3: {
  //      margin:' 0 0 5px',
  //     fontSize: '22px',
  //     fontWeight: 'bold',
  // },
  // description: {
  //     overflow: 'scroll',
  //     textOverflow: 'ellipsis',
  //     height: '164px'
  // }
}