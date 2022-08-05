// 오늘 수업 만들거
// 경매소 만들기 이거 응용해서
// 이후에 로그인 회원가입 붙혀서 구현해볼것
// 월요일에 쿠키 세션 jwt

// 사용할 모듈
// express, ejs, socket.io, fs, nodemon

// 1. packjson 설치하고
// 2. express 서버 세팅
// 3. 페이지 라우터 분리해서 보여주기
// 4. nodemon 개발 버전으로 설치

//     / 루트 경로 페이지 하나
//     / shop 페이지 하나

const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const socketio = require("socket.io");
const { dirname } = require("path");

const app = express();

// 함수를 전달했고 server의 설정에 파일의 경로를 설정해준다
// __dirname + "/cssjs"
// "/src" 이건 뒤에 설정한 경로를 /src라는 이름으로 받겠다라는 의미
// app.use("/src",express.static(__dirname + "/cssjs")) 아래랑 동일
app.use(express.static("cssjs"))

// 상품의 번호를 정해줄 변수
let counter = 0;

// 생성자 함수 (객체를 만들기 위해 함수 만듬)
function Product(name, image, price, count) {
    // 상품 번호가 증가 할 수 있게 증감 연산자 사용
    this.index = counter++
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
}

// 동적 할당으로 new를 붙여 생상자 함수 사용
// 객체 하나 만듬

// 상품을 가지고 있을 박스
// 상품들 전부 가지고 있다.
const products = [
    new Product('apple', '/', 2000, 20),
    new Product('watermelon', '/', 2000, 20),
    new Product('chocobar', '/', 2000, 20),
    new Product('vitamin', '/', 2000, 20),
    new Product('coffee', '/', 2000, 20)
]

const server = app.listen(8080,()=> {
    console.log("8080 server start")    
})

// 소켓 생성 후 실행
const io = socketio(server);

app.get('/', (req, res) => {
    fs.readFile('index.html', "utf-8", (err, result) => {
        res.send(result)
    })
})

app.get('/shop', (req, res) => {
    // fs.readFileSync("shop.html","utf-8"); 이렇게 쓰고 반환값을 받으면 html 파일을 읽어서 uft-8 인코딩 후 반환
    const page = fs.readFileSync("shop.html","utf-8");
    // res.sendFile(__dirname + "/shop.html")
    res.send(
        ejs.render(page, {
            products : products
        })
    );
})

let cart = [];
io.on("connection", (socket) => {
    //상품 구매 취소했을 때 돌리는 함수
    function onReturn(index) {
        // 물건의 갯수를 다시 돌린다.(더해주는것)
        products[index].count++;
        // 물건을 제거
        // 배열 안의 값 제거 delete 배열 [인덱스]
        delete cart[index];
        let count = products[index].count
        io.emit('count', {
            index,
            count,
        })
    }

    // 이벤트 연결 웹 소켓이 가지고 있는 이벤트
    socket.on('cart', (index) => {
        // 물건의 갯수를 감소
        products[index].count--;
        
        cart[index] = {};
        // 해당 배열의 인덱스 자리에 있는 객체에 index 키를 추가하고 벨류를 넣어준다.
        cart[index].index = index;
        let count = products[index].count;

        // {
        //     index: 1,
        //     count:2
        // }
        // 이런식으로 보임 (짧은 문법)
        io.emit('count', {
            index,
            count,
        })
    })

    // 구매 했을 때 이벤트 연결
    socket.on("buy", (index) => {
        // 카트의 해당 상품 인덱스 제거
        delete cart[index];
        let count = products.count;
        io.emit("count", {
            index,
            count,
        })
    })

    // 상품 구매를 취소했을 때
    socket.on("return", (index) => {
        onReturn(index);
    })
});