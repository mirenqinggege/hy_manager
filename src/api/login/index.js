import request from '@/util/request'

const prefix = "/login";

export function login(username, password, code, uuid){
  const data = new FormData();
  data.append("username", username);
  data.append("password", password);
  data.append("code", code);
  return request({
    headers: {'vc': uuid},
    url: prefix,
    method: 'post',
    data: data
  })
}


export function getCaptcha(){
  return request({
    url: `${prefix}/captcha`,
    method: 'get'
  });
}
