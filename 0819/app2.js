// 모듈 사용할 것
// express, ejs, 내장 모듈 path
// path 기본 경로를 다룰 수 있게 해주는 모듈

const express = require("express");
const ejs = require("ejs");
const path = require("path");
// 이렇게 폴더 경로까지만 잡으면 Index 탐색 찾은 index 파일을 기본으로 가져옴
const { sequelize, User, Post } = require("./model"); // sequelize만 가져온거
// 서버 객체 만듬
const app = express();

app.set("view engine", "ejs");

// 랜더링하는 기본 엔진을 ejs 처럼 사용한다고 알려주는 것.
app.engine("html", ejs.renderFile);
app.set("views", "./view");
app.use(express.urlencoded({ extended: false }));

// 시퀄라이즈 구성 연결 및 테이블 생성 여기가 처음 매핑
// sync 함수는 데이터 베이스 동기화 하는 사용 필요한 테이블을 생성해 줌
// 필요한 테이블들이 다 생기고 매핑된다.
// 테이블의 내용이 다르면 오류를 뱉음
// 여기서 CREATE TABLE 문이 여기서 실행됨.
// force 는 강제 초기화 시킬것인지. (테이블 내용을 다 비울건지)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("html", { id: "rudghks09" });
});

app.post("/create", (req, res) => {
  const { name, age, msg } = req.body;
  // create 함수를 사용하면 해당 테이블에 컬럼을 추가할 수 있다.
  const create = User.create({
    name: name,
    age: age,
    msg: msg,
  });
  // 위의 객체를 전달해서 컬럼을 추가할 수 있다.
  // 자바스크립트 구문으로 SQL 동작 시킬 수 있다.
  // 쿼리문 짤 필요가 없어진다.
});

app.get("/user", (req, res) => {
  // 여기서는 추가된 유저들을 봐야하므로
  // 조회를 하는데 전체 조회가 필요
  // findAll 전체 찾기
  // findAll 매개변수로 검색할 옵션
  User.findAll({})
    .then((e) => {
      res.render("page", { data: e });
    })
    .catch(() => {
      // 실패 시 에러 페이지 보여주기 err.ejs
      res.render("err");
    });
});

app.post("/create_post", (req, res) => {
  const { name, text } = req.body;
  console.log(name, text);
  // user테이블이랑 post랑 연결되있는데
  // user id 기본키로 되어있고
  // 테이블에서 하나의 컬럼값 가져온다.
  // 하나를 검색할 때 사용
  // find 매개 변수로 검색할 옵션
  User.findOne({
    where: { name: name },
  }).then((e) => {
    Post.create({
      msg: text,
      // foreign키 : user_id이거고 유저의 아이디와 연결한다고 정의를 해뒀기 때문에
      // users.js와 posts.js 에 만든 모델에
      user_id: e.id,
    });
  });
});
// 서버 연결
app.listen(80, () => {
  console.log("default server on");
});
