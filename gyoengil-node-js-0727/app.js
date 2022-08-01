// 사용할 모듈
// socketio, express, fs

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs")

const app = express();

let seats = [];
let temp = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],  
];
let temp1 = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],  
];
let temp2 = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],  
];

let seatsArr = [temp, temp1, temp2]
let index = 0;
const server = app.listen(8080, () => {
    console.log('8080 server start!')
})

// socket.io 생성 및 실행
const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("page.html", "utf-8", (err, result) => {
    res.send(result.toString());
  })
})

app.get('/seats/:id', (req, res) => { // '/seats' 경로로 seats 배열을 전송
  index = (req.params.id)
  seats = seatsArr[index]
  res.send(seats)
})

io.sockets.on('connection', (socket) => {
  console.log("연결되었습니다.");
  socket.on("reserve", (data) => {
    let seatsTemp = seatsArr[data.selectcount];
    seatsTemp[data.y][data.x] = 2;
    io.sockets.emit("reserve",data)
  })
})