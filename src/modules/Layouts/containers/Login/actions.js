export const types = {
    ON_LOGIN_USER: 'ON_LOGIN_USER',
    ON_LOGIN_SUCESS: 'ON_LOGIN_SUCESS'
}

export function onLoginUser(payload) {
    return {type: types.ON_LOGIN_USER, payload}
}

export function onLoginSuccess(payload) {
    return {type: types.ON_LOGIN_SUCESS, payload}
}