import { createSlice } from "@reduxjs/toolkit";

export enum RequestState {
  Undefined = "Undefined",
  Pending = "Pending",
  Error = "Error",
  Success = "Success",
}

export interface RequestSuccessData<T> {
  status: RequestState.Success;
  data: T;
  message: null;
}

export interface RequestFailureData {
  status: RequestState.Error;
  data: null;
  message?: string;
}

export interface RequestPendingData {
  status: RequestState.Pending | RequestState.Undefined;
  data: null;
  message: null;
}

export type RequestData<T> =
  | RequestSuccessData<T>
  | RequestFailureData
  | RequestPendingData;

const defaultState = (): RequestData<string> => ({
  status: RequestState.Undefined,
  data: null,
  message: null,
});

export const dataSlice = createSlice({
  name: "rootdata",
  initialState: defaultState(),
  reducers: {
    setRequestData: (
      state: RequestData<string>,
      action: { payload: RequestData<string> }
    ) => {
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setRequestData } = dataSlice.actions;
