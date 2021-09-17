import axios from 'axios';

const http = axios.create({
  baseURL: `https://talent-fest-api.herokuapp.com`,
  headers: { 'Content-type': 'application/json' },
  timeout: 10000,
});

const getAllSchools = () => http.get('/schools');

export default getAllSchools;
