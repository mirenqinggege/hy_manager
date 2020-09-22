import request from "../../util/request"

export function getIcons(){
  return request({
    url: "icon/getAllIcon",
    method: "get"
  })
}
