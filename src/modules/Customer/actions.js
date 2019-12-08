export const types = {
    GET_ALL_CUSTOMER : 'GET_ALL_CUSTOMER',
    GET_ONE_CUSTOMER : 'GET_ONE_CUSTOMER',
    DELETE_CUSTOMER : 'DELETE_CUSTOMER',
    UPDATE_CUSTOMER : 'UPDATE_CUSTOMER',
    ADD_CUSTOMER :'ADD_CUSTOMER',
    SEARCH_CUSTOMER: 'SEARCH_CUSTOMER',
    RESET_CUSTOMER : 'RESET_CUSTOMER'

}

export function onResetCustomer(payload) {
    return{type: types.RESET_CUSTOMER,payload}
  }

export function onGetAllCustomer(payload) {
    return{type : types.GET_ALL_CUSTOMER,payload}
}
export function onGetOneCustomer(payload) {
    return{type: types.GET_ONE_CUSTOMER,payload}
}
export function onDeleteCustomer(payload){
    return{type: types.DELETE_CUSTOMER,payload}
}
export function onUpdateCustomer(payload){
    return{type: types.UPDATE_CUSTOMER,payload}
}
export function onAddCustomer(payload) {
    return {type: types.ADD_CUSTOMER,payload}
}
export function onSearchCustomer(payload){
    return {type: types.SEARCH_CUSTOMER,payload}
}