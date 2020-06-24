import axios from 'axios';

const Axios = axios.create({
  baseURL: `http://13.233.161.148:8000/api/`,
  headers:{
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Allow': 'GET, POST, HEAD, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Accept'

  }
});

export default Axios