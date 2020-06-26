import axios from 'axios';

const Axios = axios.create({
  baseURL: `https://master.qditch.com`,
  headers:{
    // 'Access-Control-Allow-Origin' : "*",
    // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Allow': 'GET, POST, HEAD, OPTIONS',
    'Content-Type': 'application/json',
    // 'Vary': 'Accept',
    // "Access-Control-Allow-Credentials":"*",
    // "Access-Control-Allow-Headers": "Origin,Accept, X-Requested-With, Content-Type"


  }
});
// Axios.defaults.withCredentials = true;
export default Axios


// "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"