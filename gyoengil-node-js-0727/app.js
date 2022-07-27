// 사용할 모듈
// socketio, express, fs

const express = require("express");
const socketio = require("socket.io");
const fs = require("fs")

const app = express();

let seats = [

    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  
  ];

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

app.get('/seats', (req, res) => {
  res.send(seats)
})

io.sockets.on('connection', (socket) => {
  console.log("연결되었습니다.");
  socket.on("reserve", (data) => {
    seats[data.y][data.x] = 2;
    io.sockets.emit("reserve",data)
  })
})