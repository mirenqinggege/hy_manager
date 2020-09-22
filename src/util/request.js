import axios from 'axios'
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import {Message, MessageBox} from 'element-ui'
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: "/bgData",
  timeout: 10000
});

service.interceptors.request.use(config => {
  Nprogress.start();
  Nprogress.inc();
  return config
},error => {
  console.warn(error);
  return Promise.reject(error);
});

service.interceptors.response.use(res => {
  Nprogress.done();
  const code = res.status;
  if (code !== 200) {
    Message({
      type: "error",
      message: res.statusText
    })
  } else {
    return res.data;
  }
},error => {
  Message.error(error);
  return Promise.reject(error)
});

export default service;
