import request from "@/util/request";

export function login(username, password, _csrf){
  return request({
    url: `login`,
    method: "post",
    data:{
      "username":username,
      "password":password,
      "_csrf":_csrf
    }
  });
}
