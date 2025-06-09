import axios from "axios"; 

const api = axios.create({ 
  baseURL: "http://52.205.245.186/api"
});

export default api;