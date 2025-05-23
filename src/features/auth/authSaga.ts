import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginSuccess, loginFailure } from './authSlice';

const API_URL = 'https://localhost:3001';

interface LoginCredentials {
  username: string;
  password: string;
}

function* loginSaga(action: PayloadAction<LoginCredentials>) {
  try {
    const response = yield call(fetch, `${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });

    const data = yield response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    yield put(loginSuccess(data));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest('auth/login', loginSaga);
}
