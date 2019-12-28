import axios from 'axios';
import { useAuth0 } from "../auth0-hooks/react-auth0-spa";

export const axiosWithAuth = () => {
  // const { getTokenSilently } = useAuth0();
  // const token = await getTokenSilently();
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZEROREUxUmtWR01rUXdRa0l4UWtWR05EWkVNalU0TlRKR1FUVTVNemc1TmpORVF6QkZPQSJ9.eyJpc3MiOiJodHRwczovL2hhY2thdGhvbnBvcnRhbC5hdXRoMC5jb20vIiwic3ViIjoiSzJQSmg3M3E0MXlGcnlBNkVKZHI3Q3lxM25WcXYxdm9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaGFja2F0aG9uLXBvcnRhbC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTU3NzUxNjQ0MSwiZXhwIjoxNTc3NjAyODQxLCJhenAiOiJLMlBKaDczcTQxeUZyeUE2RUpkcjdDeXEzblZxdjF2byIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.jHbyaKDLQcn0vbwWWFKfGvcF96dfJPbnAnG-DbdIKiwhfi4YvXQk0C3DWE04R96aTiV1gdCctnlCYIJP6xdi_ZlVqLjXC1VpE_50Kn6i7uQdmSm7boAIoBu-sKZ2qLtucN-wvq3E7tRN5dsSCJS9HVTjAokpghLL2Vx883K5M7VgCSDeRludbTrIO-o3DZhrx2jobLO9R1VUTSZIhPeyEj24WXsMU4foyeNvFSNxs6s-oQbZlcX2BpFMSjWfkc2sQFZg4vB81cS2B5v23U7efxmY5kz4Jx-xCj2XfPhg6gf7BrtrOkCd6WLNd3L8OmemBsMe7j98xCmsqurFMucI1Q'

  return axios.create({
    // baseURL: 'https://hackathon-portal.herokuapp.com/api',
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}