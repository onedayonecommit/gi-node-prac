// crypto
// 암호화

// 단방향 양방향 암호 방식
// 단방향 복호화해서 원래 비밀번호는 알수없도록 하고
// 복호화해서 암호를 해독한다.

// 복호화는 암호문을 편문으로 변환 하는 과정
// 부호화된 데이터를 부호화 되기 전 형태로 바꿔서 사람이 읽을 수 있는 형태로 되돌려 놓는 것.

// const { rejects } = require("assert");
// const crypto = require("crypto");
// const { resolve } = require("path");

// const pw = "1234";
// let hashpw = crypto.createHash("sha512").update(pw);
// let hexstring = hashpw.digest("base64")
// console.log(hashpw);
// console.log(hexstring);

// crypto.randomBytes(32, (err, buf) => {
//     if (err) console.log(err)
//     else {
//         console.log(buf)
//     }
// })

// 크립트의 randombytes 함수로 salt 값을 만들어서
// 데이터 베이스에 저장한 후
// 모든 패스워드가 고유의 salt 값을 가지게 할 수 도 있다.

// 키 스트레칭
// 키 스트레칭은 salt 와 패스워드를 해시 함수에 넣는 과정을 반복시켜서 해커가
// 복호화를 힘들게 하는 방법

// pbkdf
// 해시함수의 컨테이너 역할을 하고
// 해시함수에 salt를 적용해서 해시함수의 반복횟수를 지정해서
// 암호화 하 수 있고 IOS 표준에 적합하며 NIST 에서 승인된 알고리즘

// scrypt
// 강력하지만 많은 메모리와 cpu 를 사용하여 오프라인 어택에 취약함
// OpenSSL 1.1 이상 제공하는 시스템에서만 사용 가능
// 주어진 자원에서 공격자가 사용할 수 있는 병렬 처리 양이 한정되 있다.

// bcrypt
// 보안에 집착하기로 유명한 OpenBSD에서 사용하고
// .NET 및 자바를 포함한 많은 플랫폼 언어에서도 사용 할 수 있다.
// 반복횟수를 늘려 연산속도를 늦출 수 있어서 연산 능력이 증가해도 공격에 대비를 할 수 있다.
// 암호화된 String중에서 일부분을 salt로 쓰고 있어서.
// 그 데이터를 얻어온 후 에 pw와 같이 보내서 비교한다.

// pbkdf

// crypto.randomBytes(32, (err, buf) => {
//     crypto.pbkdf2(
//         pw,
//         buf.toString("base64"), // 문자열로 반환하는데 인코딩 방식은 base64
//         1600000, // 반복 횟수를 지정, 반복 횟수가 많아질수록 복호화하기 어려움 다만 시간도 많이 걸림
//         64, // 결과값의 길이를 설정
//         "sha512", // 암호화 알고리즘
//         (err, hashed) => { // 마지막이 콜백 함수
//             console.log("1232131",hashed)
//         }
//     )
// })

// const createSalt = () => {
//     // 암호화를 처리하는데 시간이 걸리기 때문에
//     // Promise를 사용해서 비동기 처리를 한다.
//     new Promise((resolve, reject) => {
//         // 랜덤 바이트 생성 길이가 64
//         crypto.randomBytes(64, (err, buf) => {
//             if (err) reject(err) // 실패시 err 반환
//             else resolve(buf.toString("base64")); // 성공시 resolve 함수로 반환
//         })
//     })
// };

// 비밀번호를 해싱 해주는 함수
// const pwHasher = (userId, password) => {
//     // Promise 를 사용해서 비동기 처리
//     new Promise((resolve, reject) => {
//         const qs = "select * from members where id = ?"
//         connection.query(qs, [userId], (err, result) => {
//             if (result[0]?.salt) {
//                 const salt = await result[0].salt;
//                 crypto.pbkdf2(password, salt, 5165165, 64, "sha512", (err, key) => {
//                     resolve(key.toString("base64"))
//                 })
//             }
//             else {
//                 reject("err");
//             }
//         })
//     })
// };

// const createPwHashed = (password) => {
//     // 비동기 처리
//     new return Promise((resolve, reject) => {
//         const salt = await createSalt(); // 여기서 소금 만들구
//         crypto.pbkdf2(password, salt, 512345,64,"sha512",(err, buf) => {
//             if (err) reject(err);
//             else {
//                 resolve({password:buf.toString("base64"),salt})
//             }
//         })
//     })
// }

// 간단 암호화된 로그인 만들어보자
// 모듈은 express fs mysql2

// 데이터베이스 이름은 test8
// express에서 body 객체 사용할거임

const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql2");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rudghks110",
  database: "test8",
});

app.get("/", (req, res) => {
  res.render("main");
});

app.post("/signup", (req, res) => {
  let hashpw = bcrypt.hashSync(req.body.pw, 10);
  const qs = `insert into members (id,pw) values ('${req.body.id}', '${hashpw}');`;
  connection.query(qs, (err, result) => {
    if (err) console.log("qs error", err);
    else res.send("suc");
  });
});

app.post("/login", (req, res) => {
  connection.query(
    `select * from members where id = '${req.body.id}'`,
    (err, result) => {
      if (err) console.log(err);
      else {
        if (result[0] == undefined) {
          res.send("fail");
        } else {
          let decodepw = bcrypt.compareSync(req.body.pw, result[0].pw);
          if (decodepw) res.send("suc");
          else res.send("fail");
        }
      }
    }
  );
});

app.listen(80, () => {
  console.log("server on");
});
