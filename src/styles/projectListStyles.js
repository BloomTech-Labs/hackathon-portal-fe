export const style = {
  'project-list-wrapper': {
    width: '80%',
    border: '10px solid red',
  },
  radioGroup: {
    // border: '2px solid green',
    width: '20%',
    padding: '2%',
    textAlign: 'left'
  },
  projectsHeader: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '44px',
    color: '#232323',
    marginLeft: '30px'
  },
  projectCards: {
    background: "#1c1c1f",
    border: "1px solid #D0DDFF",
    padding: '25px',
    margin: '20px',
    width: "250px",
    borderRadius: "3%",
  },
  contentContainer: {
    display: 'flex',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '80%',
    margin: '0 auto'
  },
  projectTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    margin: '2% 0',
    color: '#D0DDFF',
  },
  projectDescription: {
    textAlign: 'left',
    overflow: 'hidden',
    color: '#D0DDFF',
    margin: '4% 2%',
    textOverflow: 'ellipsis'
  },
  viewMore: {
    color: '#D0DDFF',
    cursor: 'pointer'
  },
  button: {
    background: '#311B92;',
    color: '#FFFFFF',
    border: '1px solid',
    borderRadius: '4px',
    padding: '10px',
    width: '200px',
    minHeight: '50px',
    transition: '0.5s',
    marginTop: '20px',
    "&:hover": {
      color: '#4885E1'
    }
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