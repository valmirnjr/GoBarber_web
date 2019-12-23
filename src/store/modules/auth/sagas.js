import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "~/services/history";
import api from "~/services/api";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, "sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error("Please use the mobile application.");
      return;
    }

    yield put(signInSuccess(token, user));

    history.push("/dashboard");
  } catch (err) {
    toast.error(
      "Authentication failed, please verify your e-mail and password."
    );
    yield put(signFailure());
  }
}

export default all([takeLatest("@auth/SIGN_IN_REQUEST", signIn)]);
