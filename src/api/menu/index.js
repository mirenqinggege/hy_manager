import request from "../../util/request"

export function initMenu(){
  return request({
    url: "menu/init",
    method: "get"
  });
}

export function getMenuInfo(id){
  return request({
    url: `menu/info?menuId=${id}`,
    method: "get"
  })
}

export function edit(data){
  return request({
    url: "menu/edit",
    method: "post",
    data: data
  })
}
