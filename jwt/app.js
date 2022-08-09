// 설치할 모듈
// --------------------------------
// npm i express-session

// 저장된 세션의 정보를 파일로 보기 위해
// npm i session-file-store
// --------------------------------
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const { fstat } = require("fs");
const app = express()
const dotenv = require("dotenv").config() // env 로 빼놓은 변수들 사용 하기 위해 선언
const fs = require("fs")
const mysql = require("mysql2");
const session = require("express-session");
const { reverse } = require("dns");
const filestore = require("session-file-store")(session); // 세션 파일 스토어를 부르고 바로 함수 실행

app.use(bodyparser())
app.use(
    session({
        // 세션을 발급할 때 사용되는 키 소스코드 노출 안되게 env에 담아서 사용
        secret: process.env.SESSION_KEY,
        // 세션을 저장하고 불러올 때 다시 저장할지 여부
        resave: false,
        // 세션에 저장할 때 초기화 여부
        saveUninitialized: true,
        // 저장소를 만들지 여부
        store: new filestore()
    })
);

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT + "server start")
})

app.get("/", (req, res) => {
    // fs.readFile("index.html", "utf-8", (err, result) => {
    //     res.send(result);
    // })
    if (!req.session.key) {
        req.session.key = "rudhaskfj1k23"
    }
    res.send(`key:${req.session.key}`);
})

app.post("/login2", (req, res) => {
    res.send(req.body.id + req.body.pw)
})

app.get("/shop", (req, res) => {
    res.send(`난 숍 ${req.session.key}`)
})

app.get("/login", (req, res) => {
    fs.readFile("index2.html", "utf-8", (err, result) => {
        res.send(result)
    })
})