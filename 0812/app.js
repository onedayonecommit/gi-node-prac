// 입장 토큰만 사용해서 로그인 검증을 했는데

// Access Token만 쓴 방식은

// 1. 이용자가 로그인 시도를 하고.
// 2. 서버에서 이용자를 확인하고 입장권을 발급하는데
// JWT토큰 인증정보를 payload에 할당하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트가 이 토큰을 가지고 있는다.
// 4. 클라이언트에서 권한을 인증 요청할 때 이 토큰을 같이 보낸다.
// 5. 서버는 토큰을 확인하고 Payload의 값 인코딩되어 있는 값을 디코딩해서
// 사용자의 권한을 확인하고 (입장권이 맞는지) 데이터를 반환한다.
// 6. 만약에 토큰이 정상적인지 확인하고 (토큰이 썩었는지 입장권 시간이 지났는지)
// 7. 날짜가 지난 토큰이면 새로 로그인 시킨다. 토큰 재 발급(입장권 새로 줌)

// Refresh Token 이랑 같이 사용하면
// Access token 만 쓰는 경우 인증보안에 취약할 수 있고 다른사람이 악의적으로 토큰을 취득한 경우
// 토큰의 유효기간이 끝나기 전까지는 막을 수 없다.
// Access token의 유효기간을 짧게하고 유효기간이 짧으니까 로그인을 자주 해야하는 문제가 생김
// Refresh token으로 해결 가능
// 리프레쉬는 어세스 유효기간이 끝났을 때 재발급 용도

const express = require("express");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const mysql = require("mysql2");

// let temp = mysql.createConnection({
//     hose: "localhost",
//     password: "rudghks110",
//     user: "root",
//     database:"gyeongil0812"
// })

const app = express();

app.use(express.static("cssandjs"));
app.use(express.urlencoded({ extended: false })); // body-parser 대용

// 헤더에 쿠키 추가를 위해 사용
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./views");

const user = {
  id: "rudghks09",
  pw: "1234",
};

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  if (id == user.id && pw == user.pw) {
    // access token 발급
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      proces.env.REFRESHTOKEN_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
      res.cookie('refresh', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000
      });
      return res.send(accessToken)
  }
  else {
      return res.send("아이디 비밀번호 틀림");
    }
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT + "server start");
});
