// npm 설치 관련
// formatting, Linting 설정
// node 프로젝트를 여러명이나 개인이 작업하다 보면 예상하지 못한 오류가 생겼을 때
// 찾아내기가 힘들다. 런타임 코드를 이용자에게 전달하기 전에 문제를 집어준다.
// formatting 에서 좋은건 prettier
// Prettier - code formatter 를 마켓에서 설치

// formatting 을 해주는 Prettier 패키지 설치 명령어
// ==================================================================================
// npm install --save-dev prettier
// ==================================================================================

// -- save-dev 는 개발할때만 사용할 패키지란 뜻
// npm 패키지를 설치하면 package.json 에 내용이 추가되고
// package.json 의 중요한 역할중에 하나는 메타 데이터를 표현하는 것도 있으나
// 현재 프로젝트가 사용하는 의존성 내용을 나열하는 것에도 목적있음

// "devDependencied": {
//         "prettier": "^2.7.1"
// }

// prettier 라는 패키지가 2.7.1 버전으로 설치가 되었다.
// package-lock.json에 기록되어 있는 내용은 실제로 설치된 패키지들이 어떤것인지 알려준다.
// 팀에서 이 프로젝트를 같이 작업을 한다 하면 lock.json 도 같이 업로드 해주는 것이 좋다.

// package.json 에는 패지키 버전 앞에 ^ 눈웃음 표시 한개가 있는데 해당 표시가 있다는건
// 버전이 정확하지 않아도 설치되게 만들어 준다.

// node_modules 파일이 생겼는데 npm 설치를 하니까 이 폴더안에 설치되어 있는
//     .bin 폴더를 제외하고 다른 폴더들은 현재 프로젝트가 의존하고 있는 패키지들
//     .bin 폴더는 컴퓨터가 이해 할 수 있는 텍스트 파일(바이너리)들 이다.
// 컴퓨터의 언어가 담긴 것

// formatting 을 해보자
// 설치한 prettier를 사용해서
// 프로젝트 단위로 설정을 할 것 이다.
// 만들 파일 하나 .prettierrc

// .vscode 폴더를 만들고 안에 settings.json을 만들어 주자
// 이곳에 설정한 이유는 개인이 사용하는 vscode 설정 말고 프로젝트 단위로
// 설정을 적용 시킬 수 있다.
// 팀이나 회사에서 작업을 하면서 여러명이 작업 할 때 설정 값을 미리 정해놓고
// 작업을 시작하면 병합시 충돌을 덜어준다. 사수한테 이쁨이쁨 ^.^ :)

// linting
// linting 에서 좋은 거 ESlint 패키지이자 플러그인
// ESlint 설치 명령어
// --save-dev 개발환경에만 적용이니까 이렇게
// ===========================================================
// npm install --save-dev eslint
// ===========================================================

// lock.json 에 무적 많이 생기는데 의존성들 ( 서브 디펜던시)
// 의존성의 뜻은 코드에서 두 모듈 간의 연결이라고 보면 됌.
// 클래스가 두개 있다 치면 두 클래스의 관계성
// 그냥 쓸려고 패키지 다운 받는다고 보면됌

// eslint 도 설정 파일이 필요함
// 이 설정 파일은 확장자가 필요하다. js
// 설정파일 이름은 .eslintrc.js 이렇게 작성

// 다운로드는 마켓플레이스에서 설치
// rc의 뜻은 runtime configuration / run control / run commands / runcom / resource control 등등 여러 뜻이 있음