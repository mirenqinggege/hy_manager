import request from "../../util/request"

export function initMenu(){
  return request({
    url: "menu/init",
    method: "get"
  });
}
