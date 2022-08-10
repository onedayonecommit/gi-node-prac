// jwt express router
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const secretkey = process.env.SECRET_KEY;

router.post("/login", (req, res) => {
    const name = "soon";
    token = jwt.sign({
        type: jwt,
        name: name
    },
        secretkey, {
        expiresIn: "5m",
        issuer: 'gyeonghwan'
    }
    );
    req.session.token = token;
    let data = {
        msg: "토큰 발급 완료",
        token
    }
    res.send(data);
})

module.exports = router;