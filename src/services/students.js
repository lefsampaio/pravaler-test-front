import axios from 'axios';

const http = axios.create({
  baseURL: `https://prv-curta-teste-default-rtdb.firebaseio.com`,
  headers: { 'Content-type': 'application/json' },
  timeout: 10000,
});

const createPOST = (students) => http.post('/students.json', students);

export default createPOST;
