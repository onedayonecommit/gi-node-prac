// 내보내기 exports
module.exports = {
  extends: ["airbnb-base", "plugin:node/recommended", "prettier"],
};

// 설정 하는 법
// 미리 좋은 세팅들이 있으니까 그거로 쓰자.

// air bnb 코딩 컨벤션 사용할겨

// air bnb 패키지 설치 명령어
// ================================================================
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import
// npm 패키지 두개를 다운받아야하면
// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
// --save-dev 는 개발 환경
// --save-dev 로 받은 패키지는 devDependencies에 작성된다.
// 개발에만 필요하고 실제 구동은 필요 없는것들
// Eslint prettier package 다운 명령어
// ================================================================
// npm install --save-dev eslint-config-prettier
// ================================================================

// ================================================================

// prettier 와 충돌이 나기 때문에 빨간줄이 많이 발생
// extends: ["airbnb-base", "prettier"] prettier 의 규칙도 같이 적용해주면 된다.
// ESlint 규칙을 쓰기만 하면
// 나중에 면접가서도 eslint 사용할줄 알고 에어비엔비 규칙성을 사용했다

// node 에 대한 설정 node 전용 플러그인
// node 전용 플로그인 설치 명령어
// +==============================================================+
// npm install --save-dev eslint-plugin-node
// +==============================================================+
