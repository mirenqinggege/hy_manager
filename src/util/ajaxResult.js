import {Message, MessageBox} from "element-ui"


export function ajaxSuccess(res,fn){
  const code = res.code, msg = res.msg;
  Message({
    type: code === "00000" ? "success": "warn",
    message: msg,
    onClose(){
      if(fn){
        fn();
      }
    }
  })
}
