export const style = {
  card: {
    background: "#1c1c1f",
    border: "1px solid #D0DDFF",
    width: "24%",
    marginBottom: "3%",
    borderRadius: "3%",
    marginRight: '0.8%'
  },
  pastCard: {
    background: "#1c1c1f",
    border: "1px solid #D0DDFF",
    width: "24%",
    marginBottom: "3%",
    borderRadius: "3%",
    marginRight: '0.8%',
  },
  cardButton: {
    color: '#4885E1',
    background: '#1c1c1f',
    border: '1px solid',
    fontSize: '1.3rem',
    borderRadius: '10px',
    marginTop: '20px',
    width: '98%',
    height: '50px',
    padding: '0px 10px'
  },
  cardParent: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10%",
    justifyContent: "initial"
  },
  media: {
    width: '80%',
     paddingTop: "56.25%", // 16:9
    margin: '0 auto'
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  searchBar: {
    width: '99%'
  },
  fullList: {
    margin: "8% 10% 0px 10%"
  },
  inputOutline: {
   // RGB FOR #9b9b9b with opacity 64%
    backgroundColor: "rgba(155, 155, 155, 0.64)",
    borderRadius: "0.75rem",
    color: "#d0ddff",
    "&$focusedOutline $notchedOutline": {
      borderColor: "#4885e1 !important"
    }
  },
  focusedOutline: {},
  notchedOutline: {
    border: "2px solid #d0ddff"
  },
  hackathonName: {
    color: "#d0ddff",
    fontWeight: "bold",
    minHeight: '70px',
  },
  hackathonDescription: {
    color: '#d0ddff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  hackathonInfo: {
     // RGB FOR #d0ddff with opacity 64%
    color: 'rgba(208, 221, 255, 0.64)',
    marginTop: '7%',
  },
  link: {
    textDecoration: 'none'
  },
  content: {
    padding: '0 5%',
    textAlign: 'left',
  }
}