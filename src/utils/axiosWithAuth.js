import axios from 'axios';
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";

export const axiosWithAuth = () => {
  // const { getTokenSilently } = useAuth0();
  // const token = await getTokenSilently();
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZEROREUxUmtWR01rUXdRa0l4UWtWR05EWkVNalU0TlRKR1FUVTVNemc1TmpORVF6QkZPQSJ9.eyJpc3MiOiJodHRwczovL2hhY2thdGhvbnBvcnRhbC5hdXRoMC5jb20vIiwic3ViIjoiSzJQSmg3M3E0MXlGcnlBNkVKZHI3Q3lxM25WcXYxdm9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaGFja2F0aG9uLXBvcnRhbC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTU3NzE1MjA2MiwiZXhwIjoxNTc3MjM4NDYyLCJhenAiOiJLMlBKaDczcTQxeUZyeUE2RUpkcjdDeXEzblZxdjF2byIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.eQL6aLm3t_XGmO4rBMD_9qT7brpbUY4E1jJh4JwedwuCZEbOQLldwx7UmPg2blVCLsBG-Z5pGwxvYuMjEng6QNsIB95ttSDnlYf8WoT7hctuxbahnwteBfOpM0YdSQhXR_ZWW0I9hzuuC1VFXLeA33GaYm3NJuL_EQPPMTOe-nwyC3HvhbI_XuoNFUraGOA18woas07OZcmdZnw89JASV2YdhiRSNgE2fWU_mj1R2wc_vjOaSRZezSiNgcyEAri0EUtXlfOGitQYO4QGlrXJ7qHWxeo8rr0AT8xzHcf3rKhb-hgeWhcwGhJnPBqpqcvfmVhK9r9hkQWkVfr4ZAasyA'

  return axios.create({
    // baseURL: 'https://hackathon-portal.herokuapp.com/api',
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}