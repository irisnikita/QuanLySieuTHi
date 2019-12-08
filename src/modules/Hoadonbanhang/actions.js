export const types = {
	ADD_ROW_BILL_HOADON :'ADD_ROW_BILL_HOADON',
	ADD_SOHOADON: 'ADD_SOHOADON',
	ADD_HOADON: 'ADD_HOADON',
	RESET_HOADON: 'RESET_HOADON'

};

export function onAddRowBillHoaDon (payload){
	return{type:types.ADD_ROW_BILL_HOADON,payload};
}
export function onAddSoHoaDon (payload){
	return{type:types.ADD_SOHOADON,payload};
}
export function onAddHoaDon (payload){
	return{type:types.ADD_HOADON,payload};
}
export function onResetHoadon (payload){
	return{type:types.RESET_HOADON,payload};
}