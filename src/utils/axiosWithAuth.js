import axios from 'axios';

export const axiosWithAuth = async () => {
   let token;
   try {
      await axios({
         method: 'post',
         url: 'https://hackathonportal.auth0.com/oauth/token',
         headers: {
            'content-type': 'application/json'
         },
         data: {
            client_id: 'K2PJh73q41yFryA6EJdr7Cyq3nVqv1vo',
            client_secret:
               'H2SNZmRezyGuQIafPaSiByrA7_QYt4jtDikInhG-bciH-JwceuokZaxNkJMx_edh',
            audience: 'https://hackathon-portal.herokuapp.com/',
            grant_type: 'client_credentials'
         }
      })
         .then(res => (token = res.data.access_token))
         .catch(err => console.log(err));
   } catch (err) {
      console.log(err);
   } finally {
      return axios.create({
         baseURL: 'https://hackathon-portal.herokuapp.com/api',
         // baseURL: process.env.BACKEND_API || 'http://localhost:5000/api',
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
   }
};
