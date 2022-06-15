import { put, takeLatest, delay, race, take, call } from "redux-saga/effects";
import { setRequestData, RequestState } from "./redux";

export function* mySaga() {
  yield takeLatest("MAKE_REQUEST", makeRequest);
}

function* makeRequest() {
  yield put(
    setRequestData({
      status: RequestState.Pending,
      message: null,
      data: null,
    })
  );

  const { save, cancel, timeout } = yield race({
    save: call(randomlyTimeout),
    cancel: take("CANCEL_REQUEST"),
    timeout: delay(2000),
  });

  if (timeout) {
    yield put(
      setRequestData({
        status: RequestState.Error,
        message: "timeout",
        data: null,
      })
    );
  } else if (cancel) {
    yield put(
      setRequestData({
        status: RequestState.Undefined,
        message: null,
        data: null,
      })
    );
  } else if (save) {
    // 200 success is an assumption here
    yield put(
      setRequestData({
        status: RequestState.Success,
        message: null,
        data: "request successful",
      })
    );
  }
}

export async function randomlyTimeout() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(true), Math.floor(Math.random() * 4000))
  );
}

export function other() {}
