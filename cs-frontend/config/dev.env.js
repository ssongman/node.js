// config/dev.env.js
// 개발 환경 : 개발 환경 설정으로 운영 환경 값을 상속한다.
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEBUG_MODE: true
});
