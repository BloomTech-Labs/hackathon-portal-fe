import axios from 'axios';

export const axiosWithAuth = () => {
  // const token = localStorage.getItem('token');
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZEROREUxUmtWR01rUXdRa0l4UWtWR05EWkVNalU0TlRKR1FUVTVNemc1TmpORVF6QkZPQSJ9.eyJpc3MiOiJodHRwczovL2hhY2thdGhvbnBvcnRhbC5hdXRoMC5jb20vIiwic3ViIjoiSzJQSmg3M3E0MXlGcnlBNkVKZHI3Q3lxM25WcXYxdm9AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vaGFja2F0aG9uLXBvcnRhbC5oZXJva3VhcHAuY29tLyIsImlhdCI6MTU3Njg2MzgyMywiZXhwIjoxNTc2OTUwMjIzLCJhenAiOiJLMlBKaDczcTQxeUZyeUE2RUpkcjdDeXEzblZxdjF2byIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.RvNSGaLd6mIKnaVy_OwT1EJ1lfwibcLBC2b0iLsu04u852eF4o0uyuKLtPP3wmV8l_oiln1wTnHlcfsLw25jkSQVhqC3-lQV7gk1hljjRL86Q2K4Drv7H1Iyj1A5Yncc3OkPuLpCLdHWsW01Sx5Lq035oqjBladDjD90ToyxwYtmfghIzyDjvYwCbQDZhmusFxa0asPotIv-xtr4DoRmDMj6qtR5gxbn6mHWl3pElUqtqmNjDtf-9KyIk2G0HDpHmHdRnt1pBIazyi-JlXMAaYcqH2nAiKGnrn2Dd05D4DX27fJedPjfQLbah0LokS_ICS9cHjhV3CZBqqxbIGIwFg';

  return axios.create({
    baseURL: 'https://hackathon-portal.herokuapp.com/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}