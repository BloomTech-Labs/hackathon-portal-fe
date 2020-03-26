export const style = {
   container: {
      width: '100%',
   },
   label: {
      background: '#D0DDFF',
      borderRadius: '5px',
      marginBottom: '20px',
   },
   root: {
      overflow: 'auto',
      padding: '3%',
      borderRadius: '4px',
      width: '80%',

      margin: 'auto',
   },
   button: {
      width: '150px',
   },
   formControl: {
      width: '100 %',
   },

   icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
         outline: '2px auto rgba(19,124,189,.6)',
         outlineOffset: 2,
      },
      'input:hover ~ &': {
         backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
         boxShadow: 'none',
         background: 'rgba(206,217,224,.5)',
      },
   },
   checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
         display: 'block',
         width: 16,
         height: 16,
         backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
         content: '""',
      },
      'input:hover ~ &': {
         backgroundColor: '#106ba3',
      },
   },
   activeButton: {
      backgroundColor: '#4885E1',
      color: '#0A0A0B',
      width: '8%',
   },
   backButton: {
      border: '1px solid #311B92',
      color: '#311B92',
   },
   buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      top: 0,
      right: 0,
   },
   buttonsSubContainer: {
      top: 0,
      right: 0,
   }
}