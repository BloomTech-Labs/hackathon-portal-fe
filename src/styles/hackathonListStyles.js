import "../sass/hackathonlist/hackathonlist.scss"

export const style = {
  root: {
    border: 'none',
    'padding-left': '0px',
  },
  card: {
    // 'text-align': 'center',
    "box-shadow": 'none',
    width: "30%",
    // margin: '10px',
    marginBottom: "3%",
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
    "font-family": "Muli",
    color: '#4885E1',
    background: '#1c1c1f',
    border: '1px solid',
    fontSize: '1.3rem',
    borderRadius: '10px',
    width: '98%',
    height: '50px',
    padding: '0px 10px'
  },
  media: {
    width: '100%',
    paddingTop: "56.25%", // 16:9
    margin: '0 auto',
    'border-radius': '4px'
  },
  expandOpen: {
    transform: "rotate(180deg)"
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
    "font-family": "Muli",
    marginTop: '10px',
    padding: 0,
    "text-align": 'center',
    color: "black",
    "font-size": "18px",
    "line-height": "24px",
    fontWeight: "bold",
    // minHeight: '70px',
  },
  hackathonDescription: {
    "font-family": "Muli",
    'text-align': 'center',
    color: 'black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  link: {
    textDecoration: 'none'
  },
  details: {
    "text-align": 'center',
    'color': 'black',
    'font-family': 'Muli',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-size': '14px',
    'line-height': '18px',
    'margin-bottom': '10px'
  }

}