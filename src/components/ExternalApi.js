import React, { useState } from "react";
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";
import axios from 'axios';

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {

const token = await getTokenSilently();

axios
.get('https://hackathon-portal.herokuapp.com/api/external', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => {
    setShowResult(true);
    console.log(res.data.msg)
    setApiMessage(res.data.msg)
})
.catch(err => console.log(err))
    };


  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping API</button>
      <div>
      {showResult && <code>{apiMessage}</code>}
      </div>
    </>
  );
};

export default ExternalApi;