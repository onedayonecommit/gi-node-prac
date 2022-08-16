const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const { mainModule } = require("process");
const { unwatchFile } = require("fs");

app.use(express.static('cssandjs')); // 프론트에 이미지나 js css
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views"); // 백에 프론트를 가져오는거야
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized:true
}))
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rudghks110",
    database: "test7",
    // 다중 쿼리문 사용 가능 옵션
    multipleStatements: true,
})

app.get("/", (req, res) => {
    res.render("main")
})

app.post("/login", (req, res) => {
    const qs = `select id from members where id = '${req.body.id}' and pw = '${req.body.pw}'`
    connection.query(qs, (err, result) => {
        if (err) console.log("qserror", err)
        else {
            if (result[0] != undefined) {
                res.send("suc")
            }
            else if (result[0] == undefined) {
                res.send("fail")
            }
            else {
                res.send("err")
            }
        }
    })
})

app.get("/join", (req, res) => {
    res.render("join")
})

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT,"server on")
})
