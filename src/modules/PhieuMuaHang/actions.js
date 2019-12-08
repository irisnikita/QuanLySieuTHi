export const types = {
	SAVE_ROW_BILL: 'SAVE_ROW_BILL',
	ADD_ROW_BILL: 'ADD_ROW_BILL',
	DELETE_ROW_BILL: 'DELETE_ROW_BILL',
	UPDATE_ROW_BILL: 'UPDATE_ROW_BILL',
	RESET_ROW_BILL: 'RESET_ROW_BILL',
	TONG_CONG: 'TONG_CONG',
	ADD_ALL_BILL: 'ADD_ALL_BILL',
	GET_ALL_BILL: 'GET_ALL_BILL',
	GET_SOHOADON: 'GET_SOHOADON',
};

export function onSaveRowBill(payload) {
	return { type: types.SAVE_ROW_BILL, payload };
}
export function onAddRowBill(payload) {
	return { type: types.ADD_ROW_BILL, payload };
}
export function onDeleteRowBill(payload) {
	return { type: types.DELETE_ROW_BILL, payload };
}
export function onUpdateRowBill(payload) {
	return { type: types.UPDATE_ROW_BILL, payload };
}
export function onResetRowBill(payload) {
	return { type: types.RESET_ROW_BILL, payload };
}
export function onTongCong(payload) {
	return { type: types.TONG_CONG, payload };
}
export function onAddAllBill(payload) {
	return { type: types.ADD_ALL_BILL, payload };
}
export function onGetAllBill(payload) {
	return { type: types.GET_ALL_BILL, payload };
}
export function onGetSohoadon(payload){
	return {type:types.GET_SOHOADON,payload};
}
