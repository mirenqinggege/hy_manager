export const loginException = {
  'B0340': '登录状态过期，请重新登录！'
};

export const accountException = {
  'B0300': '账号异常',
  'B0310': '账号被冻结',
  'B0311': '账号尝试登陆次数过多',
  'B0320': '用户名和密码不能为空！'
};


/**
 * 检查返回码是否正常
 * @param exception {object} 异常信息
 * @param code {string} 返回码
 * @return {boolean}
 */
export function contain(exception, code){
  for (let exceptionKey in exception) {
    if (exceptionKey === code) {
      return true;
    }
  }
  return false;
}
