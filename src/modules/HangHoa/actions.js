export const types = {
    GET_ALL_HANGHOA : 'GET_ALL_HANGHOA',
    GET_ONE_HANGHOA : 'GET_ONE_HANGHOA',
    DELETE_HANGHOA : 'DELETE_HANGHOA',
    UPDATE_HANGHOA : 'UPDATE_HANGHOA',
    ADD_HANGHOA :'ADD_HANGHOA',
    SEARCH_HANGHOA: 'SEARCH_HANGHOA',
    RESET_HANGHOA : 'RESET_HANGHOA'

}

export function onResetHanghoa(payload) {
    return{type: types.RESET_HANGHOA,payload}
  }

export function onGetAllHanghoa(payload) {
    return{type : types.GET_ALL_HANGHOA,payload}
}
export function onGetOneHanghoa(payload) {
    return{type: types.GET_ONE_HANGHOA,payload}
}
export function onDeleteHanghoa(payload){
    return{type: types.DELETE_HANGHOA,payload}
}
export function onUpdateHanghoa(payload){
    return{type: types.UPDATE_HANGHOA,payload}
}
export function onAddHanghoa(payload) {
    return {type: types.ADD_HANGHOA,payload}
}
export function onSearchHanghoa(payload){
    return {type: types.SEARCH_HANGHOA,payload}
}