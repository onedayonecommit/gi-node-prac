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
  // 다중 쿼리문을 사용할 수 있게 허용하는 옵션이 있음
  // multipleStatements : 다중 쿼리문을 사용할 수 있도록 하는 옵션 true, false
  multipleStatements: true,
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

temp.query("select * from members2", (err, result) => {
  if (err)
    temp.query(
      "CREATE TABLE members2(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), number VARCHAR(100), series VARCHAR(100));",
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
// app.post("/delete", (req, res) => {
//   const delsql = "delete from members where id = '" + req.body.id + "';";
//   temp.query(delsql, (err, result) => {
//     if (result) res.redirect("/");
//   });
// });
app.get("/delete/:id", (req, res) => {
  // url 요청에서 파라미터를 뽑을 수 있다
  // req 요청의 값을 이용할 수 있다.
  // params == 매개변수
  // http://localhost:4000/delete/12   이런 방식이라면
  // /delete/:id 이 주소에서 id가 params 키값이고
  // http://localhost:4000/delete/12 실제 요청한 url의 /:id 이 자리에 있는 값이 value 이다.
  // {params:{id:1}} 그래서 이렇게 값을 받을 수 있음.
  // AUTO_INCREMENT도 같이 증가를 하고 값이 남아있는데
  // 컬럼을 추가할때마다 id가 생성이 자동으로 되고 AUTO_INCREMENT 도 증가를 했고
  // UPDATE 와 ALTER 의 차이는 둘다 수정하는 명령어이긴 하지만
  // update(데이터 명령어)는 데이터 베이스의 관계에 저장된 데이터를 수정하는것.
  // ALTER(데이터의 정의 명령어) 데이터베이스의 관계 구조를 수정하는데 사용된다.
  console.log(req.params);
  const sql = "delete from members where id = ?";
  const sql2 = "SET @CNT = 0;";
  const sql3 = "update members SET members.id = @CNT:=@CNT+1;";
  const sql4 = "alter table members AUTO_INCREMENT = 0;";
  temp.query(sql, [req.params.id], () => {
    temp.query(sql2 + sql3 + sql4, () => {
      res.redirect("/");
    });
  });
});

app.get("/test", (req, res) => {
  const sql = "select * from members;";
  const sql2 = "select * from members2;";
  temp.query(sql + sql2, (err, res1) => {
    console.log(res1[0]);
    console.log(res1[1]);
  });
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

app.get("/edit/:id", (req, res) => {
  fs.readFile("html/edit.html", "utf-8", (err, data) => {
    const sql5 = "select * from members where id = ?";
    temp.query(sql5, [req.params.id], (err, result) => {
      if (err) console.log(err);
      else res.send(ejs.render(data, { data: result[0] }));
    });
  });
});

app.post("/editpro", (req, res) => {
  console.log(req.body);
  const sql = "update members set name = ?, number = ? ,series = ? where id=?";
  temp.query(
    sql,
    [req.body.name, req.body.number, req.body.series, req.body.id],
    (err, result) => {
      if (err) console.log(err);
      else res.redirect("/");
    }
  );
});
