// 封装存取方法

const TOKENKEY = 'token_key'

function setToken (token) {
   localStorage.setItem(TOKENKEY, token)
}

function getToken () {
    return localStorage.getItem(TOKENKEY)
}

function clearToken () {
    localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  clearToken
}