const express = require("express");
const fs = require('fs');
const socketio = require("socket.io");

const app = express();

const PORT = 4040;

const server = app.listen(PORT, () => {
    console.log(8080,"server start!")
})
const io = socketio(server)

app.get("/", (req, res) => {
    fs.readFile("page2.html","utf-8",(err,data) => {
        res.send(data);
    })
})


// io.sockets.on("connection") 클라이언트가 접속했을 때
// io.sockets.on("disconnect") 클라이언트가 종료했을 때

io.sockets.on("connection", (socket) => {
    console.log("1")
    // 클라이언트에서 socket.emit("message",data);
    // 웹소켓에 연결되어있는 message 이벤트를 실행시켜준다.
    // 밑에 코드
    socket.on("message1", (data) => {
        //요기
        console.log("내가 확인한 첫번째 데이터",data)
        // io.sockets.emit("message2", data);
    });
});