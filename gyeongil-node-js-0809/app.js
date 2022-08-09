// jwt는 뭘까?
// JSON Web Token의 줄임말
// JSON Web Token은 웹표준으로 두개체의 JSON 객체를 사용해서
// 정보를 안정성 있게 전달해 준다.

// JWT는 사용할 정보를 자체적으로 가지고 있다.(우리가 필요한 것들)
// JWT로 발급한 토큰은 기본정보 (유저의 정보 프로필)
// 그리고 토큰이 정상인지 검증된 토큰을 증명해 주는 signature(서명)을 포함하고 있다.

// 웹서버는 http의 헤더에 넣어서 전달 가능
// url params 파라미터로도 전달 가능

// 주로 로그인이 정상적인지 회원 인증 권한에서 사용한다.

// JWT는 유저가 로그인을 요청하면 서버는 유저의 정보를 가지고
// 정상적인 유저면 토큰을 발급해서 전달해 줌
// 유저가 서버에 요청할 때 마다 JWT 를 포함해서 전달하면 서버가
// 클라이언트의 요청을 받을 때 마다 해당 토큰을 검증 후 정상이라면
// 유저가 요청한 작업을 응답해준다.
// 서버는 유저의 세션을 유지할 필요가 없고, 유저가 로그인 되었는지
// 확인할 필요가 없다. 요청 했을 때만 토큰을 확인해서 처리하기 때문에
// 서버 자원을 아낄 수 있다.

// JWT는 안정성 있게 정보를 주고 받을 수 있다. (암호화를 하기 때문)

// JWT를 생성하면 JWT의 라이브러리가 자동으로 인코딩과 해싱 작업을 알아서 해줌
// HMAC SHA256 인코딩 및 해싱

// HMAC : 해싱 기법을 적용해서 메시지의 위변조를 방지
// SHA256 : 임의의 메시지를 256 비트의 축약된 메시지로 만드는 해시(암호화) 알고리즘 중 하나

// JWT
// header
header = {
    alg: "HS256",
    typ: "JWT"
}
// payload
payload = {
    // 토큰의 제목
    sub: "holely",
    // 유저 이름
    name: "rudghks09",
    // 토큰이 발급된 시간 발급 된지 얼마나 지났는지
    iat: 1516239022 
}
// signature
// signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));

// header : 타입과 알고리즘의 정보를 가지고 있고
// payload : 유저의 정보들과 만료 기간이 포함된 객체를 가지고 있다.
// signature : header, payload를 인코딩 하고 합쳐서 비밀키로 해쉬

// 사용할 모듈
// express, jsonwebtoken, body-parser, fs, nodemon

// 설치 명령어
// npm i express jsonwebtoken body-parser
// npm install express jsonwebtoken body-parser
let PORT = 8080
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const dotenv = require('dotenv');
require("dotenv").config();
const app = express()
app.use(express.static("cssandjs"))


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT + "server start")
})
app.post("/login", (req, res) => {
    const name = "rudhgks09";
    const profile = "rudghks0981";
    // jwt 토큰 생성하는 함수
    let token = jwt.sign(
        {
            // 타입 JWT
            type: "JWT",
            // 유저 이름
            name : name,
        },
        process.env.KEY,
        {
            // 토큰 유효 시간 만료될 시간
            expiresIn: "5m",
            issuer: "나"
        }
    );
    let data = {
        mas: "토큰 내용",
        token
    };
    res.send(JSON.stringify(data));
})

app.get("/", (req, res) => {
    fs.readFile("index.html", "utf-8", (err, result) => {
        res.send(result)
    })
})