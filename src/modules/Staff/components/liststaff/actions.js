export const types = {
    GET_ALL_STAFF : 'GET_ALL_STAFF',
    GET_ONE_STAFF : 'GET_ONE_STAFF',
    DELETE_STAFF : 'DELETE_STAFF',
    UPDATE_STAFF : 'UPDATE_STAFF',
    ADD_STAFF :'ADD_STAFF',
    SEARCH_STAFF: 'SEARCH_STAFF',
    RESET_STAFF : 'RESET_STAFF'

}

export function onResetStaff(payload) {
    return{type: types.RESET_STAFF,payload}
  }

export function onGetAllStaff(payload) {
    return{type : types.GET_ALL_STAFF,payload}
}
export function onGetOneStaff(payload) {
    return{type: types.GET_ONE_STAFF,payload}
}
export function onDeleteStaff(payload){
    return{type: types.DELETE_STAFF,payload}
}
export function onUpdateStaff(payload){
    return{type: types.UPDATE_STAFF,payload}
}
export function onAddStaff(payload) {
    return {type: types.ADD_STAFF,payload}
}
export function onSearchStaff(payload){
    return {type: types.SEARCH_STAFF,payload}
}