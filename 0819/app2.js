// 모듈 사용할 것
// express, ejs, 내장 모듈 path
// path 기본 경로를 다룰 수 있게 해주는 모듈

const express = require("express");
const ejs = require("ejs");
const path = require("path");
// 이렇게 폴더 경로까지만 잡으면 Index 탐색 찾은 index 파일을 기본으로 가져옴
const { sequelize } = require("./model"); // sequelize만 가져온거
// 서버 객체 만듬
const app = express();

app.set("view engine", "ejs");

// 랜더링하는 기본 엔진을 ejs 처럼 사용한다고 알려주는 것.
app.engine("html", ejs.renderFile);
app.set("views", "./view");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("page", { id: "rudghks09" });
});

app.get("/123", (req, res) => {
  res.render("html.html");
});

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

// 서버 연결
app.listen(80, () => {
  console.log("default server on");
});
