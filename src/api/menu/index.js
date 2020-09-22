import request from "../../util/request"

export function initMenu(){
  return request({
    url: "menu/init",
    method: "get"
  });
}

export function getRootMenu(){
  return request({
    url: "menu/getRootMenu",
    method: "get"
  });
}

export function getMenus(form){
  return request({
    url: "menu/getMenus",
    method: "get",
    params: form
  })
}

export function getMenuInfo(id){
  return request({
    url: `menu/info?menuId=${id}`,
    method: "get"
  })
}

export function save(data){
  return request({
    url: "menu/save",
    method: "post",
    data: data
  })
}

export function getRoutes(){
  return request({
    url: "menu/getRoutes",
    method: "get"
  })
}

export function remove(id){
  return request({
    url: `menu/delById/${id}`,
    method: "delete"
  })
}
