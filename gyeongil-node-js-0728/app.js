const express = require("express");
const app = express()
const socketio = require("socket.io");
const fs = require("fs")

const server = app.listen(8080, () => {
    console.log("8080 server start");
})

const io = socketio(server)

app.get("/", (req, res) => {
    fs.readFile("page.html", "utf-8", (err, result) => {
      res.send(result)
  })
})

io.on("connection", (socket) => {
    console.log(socket)
    console.log("유저 접속")
    socket.on("joinRoom", (room, name) => {
        // 방 개념으로 접속 시켜주는 함수 join(방 이름)
        socket.join(room);
        console.log(room, name)
        // to(room) 현재 그 방에 있는 클라이언트에게 요청
        io.to(room).emit("joinRoom",room,name)
    })

    socket.on("leaveRoom", (room, name) => {
        // 방개념으로 떠나게 해주는 함수 leave(방 이름)
        socket.leave(room);
        io.to(room).emit("leaveRoom" , room , name);
    });
    socket.on("chat", (room, name, msg) => {
        io.to(room).emit("chat",name,msg)
    })
})

// 접속된 모든 클라이언트에게 메시지를 전송
// io.emit('이벤트명',보내줄 데이터);

// 메시지를 전송한 클라이언트에게만 메시지 전송
// socket.emit ('이벤트명', 보내줄 데이터);

// 메시지를 전송하는데 자기 제외 방송
// socket.broadcast.emit('이벤트', 보내줄 데이터);

// 특정 클라이언트에게만 귓속말
// io.to(아이디).emit('이벤트명',보내줄 데이터);

// 클라이언트 접속과 종료 들어왔을 때 나갔을 때
// io.on('connection') 접속 했을 때 ,(socket)=>{})
// io.on('disconnection') 나갔을 때 ,(socket)=>{})

