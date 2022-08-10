const express = require('express')
// express 라우터를 설정해보자 express.Router() 반환값이 있는 함수
const router = express.Router();
const fs = require("fs")
const app = express();


// app.use("view engine","ejs")
// app.use("views","/views")

router.get('/123', (req, res) => {
    fs.readFile("views/page.html", "utf-8", (err, result) => {
        res.send(result)
    })
})

// 설정한 라우터 내보내기
// module.exports로 내보내면 require() 함수를 이용해서 모듈처럼 받아 올 수 있다.
module.exports = router;