import axios from "axios";
import CONFIG from "./index";
const instance = axios.create({
  baseURL: `http://${CONFIG.HOST}:${CONFIG.PORT}`,
  timeout: 5000,
  headers: {
    // "Access-Control-Allow-Origin": true
  }
});

export default instance;
