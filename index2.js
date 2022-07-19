console.log('inde hi')
// npm 설치 관련 메타데이터 파일을 가지고 있는 json 초기화 명령어 메타데이터는 데이터들을 설명해주는 데이터(속성) npm init
// npm init -y npm install '모듈명' 터미널 취소 명령어 컨트롤 + C 

// {

// "name" : "gyoengil-node", // 패키지 이름

// "version" : "1.0.0", // 버전

// "description" : "", // 패키지 설명

// "main" : "main.js", // 메인의 파일이 어떤건지

// "scripts" : {
//     "test": "echo \"Error: no test specified\" && exit 1"     },      실행 명령어들
    
// "keywords": [], // 검색 키워드

// "author": "", // 작업자 정보

// "license": "ISC" 
//  }

// name
// 프로젝트의 이름

// version
// 프로젝트의 버전을 정의한다.

// description
// 프로젝트의 설명, 문자열로 작성 가능

// keywords
// 프로젝트를 검색할 때 참조되는 키워드

// author
// 프로젝트 작업자 정보

// scripts
// 프로젝트에서 자주 실행해야 하는 명령어를 scripts 로 작성해두면 npm 명령어로 편하게 실행 가능하다.
// "scripts" : {"start": "node index.js", "test" : "node index2.js"} 
// 이렇게 작성하고 실행은 npm start
// start가 아니면 실행 명령어는 npm run test

// license
// 모듈의 라이센스를 기록하는데 사용