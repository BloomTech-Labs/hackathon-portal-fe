import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const ExternalApi = () => {
   const [showResult, setShowResult] = useState(false);
   const [apiMessage, setApiMessage] = useState('');

   const callApi = async () => {
      (await axiosWithAuth())
         .get('http://localhost:5000/api/external')
         .then(res => {
            setShowResult(true);
            console.log(res.data.msg);
            setApiMessage(res.data.msg);
         })
         .catch(err => console.log(err));
   };

   return (
      <>
         <h1>External API</h1>
         <button onClick={callApi}>Ping API</button>
         <div>{showResult && <code>{apiMessage}</code>}</div>
      </>
   );
};

export default ExternalApi;
