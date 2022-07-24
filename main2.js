// expess가 무엇인가?
// express 란 Nodejs를 사용해서 쉽게
// 서버 구성을 할 수 있게 만들어주는 클래스와 라이브러리의 집합

const express = require("express");
const app = express();
// ejs는 node.js와 express 에서 많이 사용하고 있는 템플릿 엔진
// ejs는 우리가 쓰는 기존 html문법을 사용하면서 <% %> 이런 문법을 사용하여 크게 벗어나지 않게
// 서버와 데이터를 사용할 수 있는 장점이 있다.
// ejs 설치
const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { info } = require("console");
const { query } = require("express");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
  // extended
  // true : express에 기본 내장된 쿼리 스트링 모듈 사용
  // false : 쿼리 스트링 모듈의 기능이 좀 더 확장된 qs 모듈을 사용한다.
);

const temp = mysql.createConnection({
  user: "root",
  password: "rudghks110",
  database: "test5",
});

temp.query("select * from member", (err, result) => {
  if (err)
    temp.query(
      "CREATE TABLE member(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), number VARCHAR(100), series VARCHAR(100));",
      (err12, result12) => {
        if (err12) console.log("쿼리 틀림");
        else console.log(result12);
      }
    );
  else console.log(result);
});
// fs는 파일 읽기 쓰기를 쉽게 도와주는 모듈
// fs 설치 명령어

const PORT = 4000;

app.listen(PORT, () => {
  console.log("server start!!");
});

app.get("/", (req, res) => {
  //   console.log(req);
  // fs 모듈로 파일을 읽어온다
  // fs 모듈이 readFile 파일을 읽어오는 함수
  // 매개변수 첫번째 파일의 경로이름
  // 두번째는 인코딩 방식
  // 세번째는 콜백 함수
  fs.readFile("html/list.html", "utf-8", (err, data) => {
    // ejs render 함수로 fs 로 불러온 파일을 그려줌
    temp.query("select * from members", (error, result) => {
      if (error) console.log(error);
      else {
        res.send(
          ejs.render(data, {
            data: result,
          })
        );
      }
    });
  });
});

app.get("/insert", (req, res) => {
  fs.readFile("html/insert.html", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/insert", (req, res) => {
  const data = req.body;
  const insql = "insert into members (name, number, series) values (?,?,?)";
  temp.query(insql, [data.name, data.number, data.series], () => {
    res.redirect("/");
  });
});
// app.get("/insert", (req, res) => {});
app.post("/delete", (req, res) => {
  temp.query(
    "delete from members where id = '" + req.body.id + "';",
    (err, result) => {
      if (result) res.redirect("/");
    }
  );
});

app.get("/revise", (req, res) => {
  //   console.log(req);
  // fs 모듈로 파일을 읽어온다
  // fs 모듈이 readFile 파일을 읽어오는 함수
  // 매개변수 첫번째 파일의 경로이름
  // 두번째는 인코딩 방식
  // 세번째는 콜백 함수
  fs.readFile("html/revise.html", "utf-8", (err, data1) => {
    // ejs render 함수로 fs 로 불러온 파일을 그려줌
    temp.query("select * from members", (error, result) => {
      if (error) console.log(error);
      else {
        console.log(result);
        console.log(data1);
        res.send(
          ejs.render(data1, {
            data1: result,
          })
        );
      }
    });
  });
});

app.post("/revise", (req, res) => {
  console.log(req.body);
  const info12 = [];
  if (req.body.rename != "") {
    temp.query(
      "update members set name = '" +
        req.body.rename +
        "' where id = '" +
        req.body.id +
        "';"
    );
  }
  if (req.body.renumber != "")
    temp.query(
      "update members set number = '" +
        req.body.renumber +
        "' where id = '" +
        req.body.id +
        "';"
    );
  if (req.body.reseries != "")
    temp.query(
      "update members set series = '" +
        req.body.reseries +
        "' where id = '" +
        req.body.id +
        "';"
    );
  res.redirect("/");
  console.log(info12);
  // temp.query("update members set ");
});
