// config/dev.env.js
// 테스트 환경 : 테스트 환경 설정으로 개발 환경 값을 상속한다.
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
});
