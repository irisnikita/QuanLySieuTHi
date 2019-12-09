import {all} from 'redux-saga/effects';

// Middleware
import {getAllSupplier} from './modules/Nhacungcap/middleware';

export default function* rootSaga() {
	yield all([
		getAllSupplier()
	]);
}