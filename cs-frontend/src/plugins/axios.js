// Lib imports
import axios from "axios";

// TODO: 기본 URL 설정
// Sets the default url used by all of this axios instance's requests
//axios.defaults.baseURL = "http://python-was-sample1.ktdscoe.myds.me";

console.log("VUE_APP_BASE_URL --> " + process.env.VUE_APP_BASE_URL);
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_BASE_URL !== undefined
      ? process.env.VUE_APP_BASE_URL
      : null
    : null;

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}
