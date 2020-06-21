import axios from 'axios';

const Axios = axios.create({
//   baseURL: `http://jsonplaceholder.typicode.com/`
  baseURL: `http://13.233.161.148:8000/api/`
});

export default Axios