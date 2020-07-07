// authorized lets you know if the token is true or not
export default {
  authorized: state => !!state.token,
  authstatus: state => state.authStatus,
  getUserInfo: state => state.user
};
