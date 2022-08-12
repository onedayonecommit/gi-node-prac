const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require("dotenv").config();

const secretkey = process.env.SECRET_KEY;

// app.js에서 use() 함수로 요청 url을 설정해서
// /userView에서 시작
router.post('/', (req, res) => {
    const token = req.session.token;
    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) console.log("토큰 에러", err)
        console.log(decoded)
        res.send(decoded)
    })
})
module.exports = router;
