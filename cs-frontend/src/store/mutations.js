/* eslint-disable no-unused-vars */
import * as types from "./mutation-types";

export default {
  [types.AUTH_LOGIN](state, payload) {
    // TODO:
    const { token, userId, userName, email, deptName } = payload;

    state.token = token;
    state.user = { userId, userName, email, deptName };
    // throw new Error("AUTH_LOGIN mutation 을 구현해야 합니다.");
  },

  [types.AUTH_LOGOUT](state) {
    // TODO:
    state.token = null;
    state.user = null;
    // throw new Error("AUTH_LOGOUT mutation 을 구현해야 합니다.");
  },

  [types.FETCH_ALL_TASKLIST](state, payload) {
    // TODO:
    throw new Error("FETCH_ALL_TASKLIST mutation 을 구현해야 합니다.");
  },

  [types.ADD_TASK](state, payload) {
    // TODO:
    throw new Error("ADD_TASK mutation 을 구현해야 합니다.");
  },

  [types.UPDATE_TASK](state, payload) {
    // TODO:
    throw new Error("UPDATE_TASK mutation 을 구현해야 합니다.");
  },

  [types.REMOVE_TASK](state, payload) {
    // TODO:
    throw new Error("REMOVE_TASK mutation 을 구현해야 합니다.");
  }
};
