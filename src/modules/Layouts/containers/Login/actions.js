export const types = {
    ON_LOGIN_USER: 'ON_LOGIN_USER',
    ON_LOGIN_SUCESS: 'ON_LOGIN_SUCESS',
    ON_LOGOUT_USER: 'ON_LOGOUT_USER',
    ON_TOGGLE_BAR: 'ON_TOGGLE_BAR'
}

export function onLoginUser(payload) {
    return {type: types.ON_LOGIN_USER, payload}
}

export function onLoginSuccess(payload) {
    return {type: types.ON_LOGIN_SUCESS, payload}
}
export function onLogoutUser(payload) {
    return{type: types.ON_LOGOUT_USER,payload}
  }
export function onToggleBar(payload) {
    return{type: types.ON_TOGGLE_BAR,payload}
  }