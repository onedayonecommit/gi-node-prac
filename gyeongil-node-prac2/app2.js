const express = require("express");
const fs = require('fs');
const socketio = require("socket.io");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(8080,"server start!")
})

const io = socketio(server)