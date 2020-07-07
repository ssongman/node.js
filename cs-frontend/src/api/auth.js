// Backend API Stub Code

import client from "./client";

export default {
  login: authInfo => {
    // TODO: 서버 호출 로직을 구현한다.
    return new Promise((resolve, reject) => {
      client
        .post("/auth/login", authInfo)
        .then(res => {
          resolve({ token: res.data.token, userId: res.data.userId });
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  }
};
