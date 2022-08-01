const express = require("express");
const socketio = require("socket.io");
const app = express()
const fs = require("fs");

app.use(express.static('cssandjs'));

const server = app.listen(8080, () => {
    console.log("8080 server start");
})

const io = socketio(server);

app.get('/', (req, res) => {
    fs.readFile("page2.html", "utf-8", (err,result) => {
        res.end(result)
    })
})
io.on("connection", (socket) => {
    console.log(socket)
    console.log("접속하였습니다.")
    socket.on("btnclick", (data) => {
        console.log(data)
        io.sockets.emit("two",data.chat)
    })
})