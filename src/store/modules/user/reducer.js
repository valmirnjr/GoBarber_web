import produce from "immer";

const INITIAL_SATE = {
  profile: null,
};

export default function user(state = INITIAL_SATE, action) {
  switch (action.type) {
    case "@auth/SIGN_IN_SUCCESS":
      return produce(state, draft => {
        draft.token = action.payload.user;
        draft.signed = true;
      });
    default:
      return state;
  }
}
