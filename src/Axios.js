import axios from 'axios';

const Axios = axios.create({
  baseURL: `https://master.qditch.com`,
  headers:{
 
    'Content-Type': 'application/json',



  }
});
// Axios.defaults.withCredentials = true;
export default Axios


// "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"