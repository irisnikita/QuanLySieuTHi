import {types} from './actions';
import {takeLatest} from 'redux-saga/effects';

function* getSupplier() {
	console.log('vi');
}

export function* getAllSupplier() {
	yield takeLatest(types.GET_ALL_SUPPLIER, getSupplier);
}