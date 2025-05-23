import { all } from 'redux-saga/effects';
import { watchLogin } from '../features/auth/authSaga';

export default function* rootSaga() {
  yield all([watchLogin()]);
}
