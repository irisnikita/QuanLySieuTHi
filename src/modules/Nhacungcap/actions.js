export const types = {
	GET_ALL_NCC : 'GET_ALL_NCC',
	GET_ONE_NCC : 'GET_ONE_NCC',
	DELETE_NCC : 'DELETE_NCC',
	UPDATE_NCC : 'UPDATE_NCC',
	ADD_NCC :'ADD_NCC',
	SEARCH_NCC: 'SEARCH_NCC',
	RESET_NCC : 'RESET_NCC',
	GET_ALL_SUPPLIER: 'GET_ALL_SUPPLIER'
};

export function onResetNcc(payload) {
	return{type: types.RESET_NCC,payload};
}

export function onGetAllNcc(payload) {
	return{type : types.GET_ALL_NCC,payload};
}
export function onGetOneNcc(payload) {
	return{type: types.GET_ONE_NCC,payload};
}
export function onDeleteNcc(payload){
	return{type: types.DELETE_NCC,payload};
}
export function onUpdateNcc(payload){
	return{type: types.UPDATE_NCC,payload};
}
export function onAddNcc(payload) {
	return {type: types.ADD_NCC,payload};
}
export function onSearchNcc(payload){
	return {type: types.SEARCH_NCC,payload};
}
export function getAllSupplier(){
	return {type: types.GET_ALL_SUPPLIER};
}