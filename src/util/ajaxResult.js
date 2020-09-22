import {Message, MessageBox} from "element-ui"


export function ajaxSuccess(res, fn) {
  ajaxCallback(res,fn,null);
}

export function ajaxCallback(res, sFn, eFn) {
  const code = res.code, msg = res.msg;
  if (code === "00000") {
    Message({
      type: "success",
      message: msg,
      onClose() {
        if (sFn) {
          sFn();
        }
      }
    })
  } else {
    Message({
      type: "error",
      message: msg,
      onClose() {
        if (eFn) {
          eFn();
        }
      }
    })
  }
}
