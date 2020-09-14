import axios from 'axios'
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8";
const service = axios.create({
  baseURL: "/bgData",
  timeout: 10000
});

service.interceptors.request.use(config => {
  return config
},error => {
  console.warn(error);
  return Promise.reject(error);
});

service.interceptors.response.use(res => {
  const code = res.status;
  if (code !== 200) {
    this.$message({
      type: "error",
      message: res.statusText
    })
  } else {
    return res.data;
  }
},error => {
  return Promise.reject(error)
});

export default service;
