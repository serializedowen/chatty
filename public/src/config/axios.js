import axios from "axios";
import CONFIG from "./index";

import EventEmitter from "../utils/eventEmitter";
import cookie from "../utils/cookie";
const instance = axios.create({
  baseURL: `http://${CONFIG.HOST}:${CONFIG.PORT}`,
  timeout: 5000,
  headers: {
    Authorization: `${cookie.getCookie("token")}`
  },
  withCredentials: true
});

instance.eventEmitter = new EventEmitter();

instance.interceptors.response.use(
  resolve => resolve,
  err => instance.eventEmitter.emit("network error", "an error")
);

export default instance;
// export
