// 클라이언트가 접속하는 함수  
let room = ""
window.onload = function(){
    loginbtn.onclick = function(){
        const socket = io.connect();
        login.style.display = "none";
        main.style.display = "block";
        const name = username.value;
        let addroom = `
        <option value="${name}">${name}</option>
        `
        socket.emit("joinpeople", addroom)
        socket.on("checkjoin", (data) => {
            console.log(data)
            rooms.innerHTML += data
            room = rooms.options[rooms.selectedIndex].value;
        })
        //rooms이게 select 태그이며 options 가 select 태그 안에 있는 option 들
        // options 이건 배열
        // rooms가 select 태그인데 selectedIndex 이건 선택되어있는 옵션의 인덱스
        console.log(room)
        console.log(rooms.options);
        console.log(rooms.selectedIndex);
        console.log("io=",io,"이게 io 다");
        socket.emit("joinRoom", room, name);
        
        rooms.onchange = function(e){
            let el = e.target;
            console.log(el.selectedIndex)
            socket.emit("leaveRoom", room, name)
            room = rooms.options[rooms.selectedIndex].value;
            socket.emit("joinRoom", room, name)
        }
        socket.on("joinRoom",(room,name)=>{
            messages.innerHTML += `
            <li class = "join_text">
                ${name}님이 ${room}에 입장하셨습니다.    
            </li>
            `;
        })
        socket.on("leaveRoom",(room, name)=>{
            messages.innerHTML += `
            <li class = "leave_text">
                ${name}님이 ${room}에서 퇴장하셨습니다.    
            </li>
            `
        });

        socket.on("chat",(name, msg)=>{
            messages.innerHTML += `
            <li>
                ${name} : ${msg}    
            </li>
            `
        });

        sendbtn.onclick = function(){
            socket.emit("chat", room, name, msg.value);
            msg.value = "";
        };
    }
}
// socket.emit('connection',()=>{})