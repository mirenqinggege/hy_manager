import request from '@/util/request'

const prefix = "/login";

export function login(){

}


export function getCaptcha(){
  return request({
    url: `${prefix}/captcha`,
    method: 'get'
  });
}
