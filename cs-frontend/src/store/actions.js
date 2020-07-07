/* eslint-disable no-unused-vars */
import * as types from "./mutation-types";
// 각 업무에 맞춰 api 서버를 분리한다.
import { Auth, List, Task } from "../api";

export default {
  login: ({ commit }, authInfo) => {
    // FIXME: for test
    if (!authInfo) {
      throw new Error("authInfo 객체는 필수입니다.");
    } else {
      const authorizedUserInfo = {
        token: "123123qewrqwer",
        userId: "1",
        userName: "아스날",
        deptName: "고객5G&AI팀",
        email: "frontend@kt.com"
      };
      return commit(types.AUTH_LOGIN, authorizedUserInfo);
    }

    // TODO: Auth API 에 구현한 비즈니스 로직을 호출한다.
    // eslint-disable-next-line no-unreachable
    return Auth.login(authInfo)
      .then(({ token, userId, email, deptName }) => {
        commit(types.AUTH_LOGIN, { token, userId, email, deptName });
      })
      .catch(err => {
        throw err;
      });
    // throw new Error("login action 은 반드시 구현되어야 합니다.");
  },

  logout: ({ commit }) => {
    // TODO:
    return commit(types.AUTH_LOGOUT);
    // throw new Error("logout action 은 반드시 구현되어야 합니다.");
  },

  fetchLists: ({ commit }) => {
    // TODO:
    throw new Error("fetchLists action 은 반드시 구현되어야 합니다.");
  },

  addTask: ({ commit }) => {
    // TODO:
    throw new Error("addTask action 은 반드시 구현되어야 합니다.");
  },

  updateTask: ({ commit }) => {
    // TODO:
    throw new Error("updateTask action 은 반드시 구현되어야 합니다.");
  },

  removeTask: ({ commit }) => {
    // TODO:
    throw new Error("removeTask action 은 반드시 구현되어야 합니다.");
  }
};
