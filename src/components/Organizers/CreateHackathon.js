import React from 'react';
import { withFormik, Form, Field } from 'formik';
import { Button, FormLabel } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const CreateHackathon = () => {
  return(
    <div className='createHackathonContainer'>
      <Form>
        <FormLabel>Hackathon info</FormLabel>
        <label className='hackathonName'>
          <br />
          <FormLabel>Hackathon name</FormLabel>
          <br />
          <Field 
            type='text'
            name='hackathonName'
            component={TextField}
            variant="outlined"
            margin='dense'
          />
        </label>
        <label className='hackathonName'>
          <br />
          <FormLabel>Hackathon location</FormLabel>
          <br />
          <Field 
            type='text'
            name='hackathonName'
            component={TextField}
            variant="outlined"
            margin='dense'
          />
        </label>
        <label className='hackathonName'>
          <br />
          <FormLabel>Event URL</FormLabel>
          <br />
          <Field 
            type='text'
            name='hackathonName'
            component={TextField}
            variant="outlined"
            margin='dense'
          />
        </label>
        <label className='hackathonName'>
          <br />
          <FormLabel>Page title</FormLabel>
          <br />
          <Field 
            type='text'
            name='hackathonName'
            component={TextField}
            variant="outlined"
            margin='dense'
          />
        </label>
        <label className='hackathonName'>
          <br />
          <FormLabel>Prize</FormLabel>
          <br />
          <Field 
            type='text'
            name='hackathonName'
            component={TextField}
            variant="outlined"
            margin='dense'
          />
        </label>
      </Form>
    </div>
  )
};

const FormikCreateHackathon = withFormik({ mapPropsToValues({ }
) {
    return {}
},

  handleSubmit(){}
})(CreateHackathon)

export default FormikCreateHackathon;