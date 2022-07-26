// mysql 프로젝트에 연결
// mysql npm 설치 명령어
// mysql 과 mysql2 의 차이점
// mysql은 콜백 기반이기 때문에 promise 를 사용하지 못함
// mysql을 보안한다하면 promise-mysql을 설치해서 사용해야 한다.
// mysql2 는 promise 를 지원하기 때문에 바로 사용 가능.

const http = require("http");
const mysql = require("mysql2");

// createConnection
// host : 연결할 호스트
// port : 연결 포트
// user : 사용자 이름
// password : 사용자 비번
// database : 연결할 데이터베이스
// debug : 디버그 모드 사용할거냐

const temp = mysql.createConnection({
  user: "root",
  password: "rudghks110",
  database: "test3",
});

temp.query("SELECT * FROM members", (err, result) => {
  if (err) {
    const sql =
      "CREATE TABLE members(id INT AUTO_INCREME123123T PRIMARY KEY, name VARCHAR(100), number VARCHAR(100), series VARCHAR(100));";
    temp.query(sql);
  } else {
    console.log(result);
  }
});

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  req.statusCode = 200;
  // 한글이 깨지면 왜 깨질까.. 인코딩 방식을 정해보자
  // res setHeader() 함수를 사용해서 헤더의 정보를 설정할 수 있다.
  // 요청된 url 확인
  // req.url

  // 요청된 method 확인
  // req.method

  // js 내용이 수정되었을 때 자동으로 모니터링 해서 서버를 재시작 해주는 툴
  // nodemon 노드 모니터링
  // npm install -dev nodemon -g
  const URL = req.url;
  switch (URL) {
    case "/":
      res.write("메인");
      res.end("메인 페이지");
      break;
    case "/shoping":
      res.end("상점 페이지");
      break;
    case "/mypage":
      res.end("마이 페이지");
      break;
    case "/list":
      temp.query("SELECT * FROM members", (err, data) => {
        if (err) {
          const sql =
            "CREATE TABLE members(id INT AUTO_INCREME123123T PRIMARY KEY, name VARCHAR(100), number VARCHAR(100), series VARCHAR(100));";
          temp.query(sql);
        } else {
          // data에는 members 테이블의 내용이 담김
          res.end(JSON.stringify(data));
        }
      });
      break;
    case "/add":
      // VALUES(?,?,?) 작성하면 이렇게 밸류의 값을 두번째 배열 타입의 매개변수로 추가할 수 있다.
      // eslint-disable-next-line no-case-declarations
      const sql = "insert into members (name, number, series) values (?,?,?)";
      temp.query(sql, ["이름", "123", "123"]);
      break;
    default:
      break;
  }
  console.log(req.url);
  // res.end("good bye my friend");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`${PORT}번 서버 시작`);
});
