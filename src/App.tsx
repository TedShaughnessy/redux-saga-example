import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RequestData, RequestState } from "./redux";

export function App() {
  const requestData = useSelector((state: RequestData<string>) => state);
  console.log("render", requestData);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch({ type: "MAKE_REQUEST" })}>
        Trigger Request
      </button>
      <h3>
        Request Status:{" "}
        <span className={requestData.status}>{requestData.status}</span>
      </h3>
      <p className={requestData.status}>
        {requestData.status === RequestState.Success
          ? requestData.data
          : requestData.message}
      </p>
      <button onClick={() => dispatch({ type: "CANCEL_REQUEST" })}>
        Cancel Request
      </button>
    </div>
  );
}
