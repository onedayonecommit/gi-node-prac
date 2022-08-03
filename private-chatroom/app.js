const express = require("express")
const app = express()
const socketio = require("socket.io")
const fs = require("fs")
const server = app.listen(8080, () => {
    console.log('8080 server start!');
})

app.use(express.static("cssandjs"))

const io = socketio(server);

app.get('/', (req,res) => {
    fs.readFile("app.html", "utf-8", (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

io.on("connection", (socket) => {
    console.log(socket)
    console.log("누군가 접속하였습니다.")
    console.log(io.engine.clientsCount) // 현재 서버에 접속해있는 유저 수
    let count = io.engine.clientsCount
    socket.emit("usercount",count)
})