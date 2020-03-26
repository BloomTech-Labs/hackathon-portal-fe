export const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
    width: '28.3%',
    margin: '0 auto',
  },
  label: {
    background: '#9E9E9E',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  root: {

    padding: '3%',
    borderRadius: '5px',
    background: 'white',
    minWidth: '100%',
    '& > *': {

      Width: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '500px',
  },
  button: {
    marginTop: '50px',
    width: '92px',
    height: '42px',
    background: 'rgba(0, 0, 0, 0.87)',
  },
  formControl: {
    marginRight: '5px',
    minWidth: '23%',
    borderRadius: '4px',
    background: 'rgba(0, 0, 0, 0.04);',
  },
  topInputs: {
    background: '#F5F5F5',
    ':focused': {
      color: 'green'
    }
  },
  maxMembers: {
    width: '100%',
  },
  topDropdowns: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  bottomDropdowns: {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  iosBox: {
    marginRight: '2%',
  },
  radioGroup: {
    display: 'flex',
  },
  rgroupContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row-reverse',
  },
  addProjectButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addProjectButton: {
    background: '#311B92',
    color: '#fff',
    textTransform: 'none',

    '&:hover': {
      background: '#311B92',
      opacity: '0.6',
      transition: 'o.2s'
    }

  },
  errorMessage: {
    color: 'red',
  },
}