import { expectSaga } from "redux-saga-test-plan";
import { setRequestData, RequestState } from "./redux";
import { mySaga, randomlyTimeout } from "./saga";
import { call } from "redux-saga-test-plan/matchers";

it("handles success", async () => {
  await expectSaga(mySaga)
    .provide([[call.fn(randomlyTimeout), true]])
    .dispatch({ type: "MAKE_REQUEST" })
    .call(randomlyTimeout)
    .put(
      setRequestData({
        status: RequestState.Success,
        message: null,
        data: "request successful",
      })
    )
    .silentRun();
});
