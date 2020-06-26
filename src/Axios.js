import axios from 'axios';

const Axios = axios.create({
  baseURL: `https://master.qditch.com`,
  headers:{
    'Access-Control-Allow-Origin' : "*",
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Allow': 'GET, POST, HEAD, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Accept'

  }
});

export default Axios