
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
// import { fetchUserInfoAPI } from './api';

function* fetchUserInfo() {
  try {
    const user = yield setTimeout(() => ({userName: 'lisi'}), 100);
    console.log('====> user: ', user)
    yield put({ type: "FETCH_USER_SUCCEEDED", payload: user });
  } catch (e) {
    yield put({ type: "FETCH_USER_FAILED", payload: e.message });
  }
}

function* rootSaga() {
  yield takeEvery("FETCH_USER_INFO", fetchUserInfo);
}

export default rootSaga;
