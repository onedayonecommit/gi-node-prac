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
const { create } = require("domain");
// const filestore = require("session-file-store")(session); // 세션 파일 스토어를 부르고 바로 함수 실행

let temp = mysql.createConnection({
    host: "localhost",
    password: "rudghks110",
    database: "jwt",
    user: "root"
})
app.use(bodyparser.urlencoded({ extended: false }));
app.use(
    session({
        key: "rudghks09",
        // 세션을 발급할 때 사용되는 키 소스코드 노출 안되게 env에 담아서 사용
        secret: process.env.SESSION_KEY,
        // 세션을 저장하고 불러올 때 다시 저장할지 여부
        resave: false,
        // 세션에 저장할 때 초기화 여부
        saveUninitialized: true,
        // 저장소를 만들지 여부
        // store: new filestore(),
    })
);
app.set('view engine', 'ejs');
app.set('views',"./views")

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT + "server start")
})

app.get("/", (req, res) => {
    temp.query("select * from members where id = '"+req.body.id+"';", (err, result) => {
        if (err) console.log(err)
    })
    console.log(req.session.user_id)
    if (req.session.num === undefined) {
        req.session.num = 1
    }
    else req.session.num++
    if (req.session.user_id === undefined) {
        res.render("index")
    }
    else {
        res.render("logout", {
            id:req.session.user_id
        })
    }
})

app.post("/login2", (req, res) => {
    const signquery = "insert into members (id, pw) values (?,?) "
    const checkquery = "select id from members where id = '"
        temp.query(signquery, [req.body.id, req.body.pw], (err, result) => {
            if (err) {
                console.log("쿼리문 에러", err)
            }
            else {
                temp.query(checkquery + req.body.id + "';", (err, result2) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(result2)
                        req.session.user_id = result2[0].id
                        console.log(req.session.user_id)
                            res.redirect("/")
                    }
                })
            }
        })
    })

app.get("/already", (req, res) => {
    res.render("already")
})

app.get("/shop", (req, res) => {
    res.send(`난 숍 ${req.session.key}`)
})

app.get("/login", (req, res) => {
    res.render("index2")
})

app.get("/success", (req, res) => {
        res.cookie("rudghks's cookie", session, {
            httpOnly: true,
            maxAge: 1000 * 60 * 20, // 쿠키 발급 후 만료시간 밀리초 단위;
        })
    res.render("success")
})

app.post("/logout", (req, res) => {
    req.session.destroy(res.redirect("/"));
})

app.get("/session", (req,res) => {
    if (req.session.count) {
        req.session.count++;
        res.send("hi")
    }
    else res.redirect("/")
})