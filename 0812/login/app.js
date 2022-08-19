const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const { mainModule } = require("process");
const { connect } = require("http2");
const bcrypt = require("bcrypt");

// 처음부터 단방향으로 암호화시켜주는 해시함수
// bcrypt 는 값이 4등분 나눠진다.
// Algorithm : 알고리즘이 뭔지 "$2b$" bcrypt 라는 것 이다.
// cost factor : 키 스트레칭한 횟수
// salt : 128비트의 솔트 22자 base64로 인코딩
// hash : 솔트 기법과 키 스트레칭을 한 해시값
const pw = "1234";
let hashpw = bcrypt.hashSync(pw, 10);
console.log(hashpw);
console.log(bcrypt.compareSync(pw, hashpw));
app.use(express.static("cssandjs"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rudghks110",
  database: "test7",
  // 다중 쿼리문 사용 가능 옵션
  multipleStatements: true,
});

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/login", (req, res) => {
  // const { userId, password } = req.body;
  const qs = `select id from members where id = '${req.body.id}' and pw = '${req.body.pw}'`;
  connection.query(qs, (err, result) => {
    if (err) console.log("qserror", err);
    else {
      if (result[0] != undefined) {
        // ?. 구문 뒤에 키값이 있는지 먼저 보고 값을 참조 없으면 터지는 일을 방지
        const accesstoken = jwt.sign(
          {
            userid: result[0].id,
            mail: "rudghks09@naver.com",
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "15s",
            issuer: "gyeonghwan",
          }
        );
        const refreshtoken = jwt.sign(
          {
            userid: result[0].id,
          },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "2m",
            issuer: "gyeongil",
          }
        );
        const sql = "update members set refresh = ? where id = ?";
        connection.query(sql, [refreshtoken, req.body.id], (err, res) => {
          if (err) console.log(err);
        });
        req.session.access_token = accesstoken;
        req.session.refresh_token = refreshtoken;
        res.send("suc");
      } else if (result[0] == undefined) {
        res.send("fail");
      } else {
        res.send("err");
      }
    }
  });
});

const middleware = (req, res, next) => {
  // const accessToken = req.session.access_token;
  // const refreshtoken = req.session.refresh_token;
  const { access_token, refresh_token } = req.session;
  jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, acc_decoded) => {
    if (err) {
      // 썩은 토큰이면
      // 로그인페이지로 넘기거나
      // 404 500 에러페이지 발생
      // 알아서 하기
      res.send("재 로그인 요청");
      res.redirect("/");
    } else {
      // next();
      jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN,
        (err, ref_decoded) => {
          if (err) res.send("재 로그인 요청");
          else {
            const sql = "select refresh from members where id = ?";
            connection.query(sql, [ref_decoded.userid], (err, res1) => {
              if (err) console.log("sql에러 ", err);
              else {
                if (res[0].refresh == refresh_token) {
                  // 다른 사람이 중간에 로그인해서 재발급이 됐는지 확인
                  const accessToken = jwt.sign(
                    {
                      user: ref_decoded.userid,
                    },
                    process.env.ACCESS_TOKEN,
                    {
                      expiresIn: "15s",
                      issuer: "gyeonghwan",
                    }
                  );
                  req.session.access_token = accessToken;
                  next();
                } else {
                  res.send("재 로그인 요청");
                }
              }
            });
          }
        }
      );
    }
  });
};

// middleware 이 미들웨어 함수에서 next() 함수를 사용하지 못하면
// 다음 콜백함수는 실행되지 않는다
// 문지기한테 막힘
// next() 함수를 실행하면 다음 콜백으로 요청 및 응답 작업 동작을 한다.
// 로그인이 되어있는 페이지만 요청과 응답을 할 수 있게
app.get("/check", middleware, (req, res) => {
  res.send("login complete");
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT, "server on");
});
