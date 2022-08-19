const dotenv = require("dotenv").config();

// 데이터 베이스 접속에 필요한 설정값 객체
const config = {
  dev: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: "127.0.0.1", // 여기에 AWS에서 RDS 쓰거나 지원 디비 등등을 사용한다면
    // 이곳에 주소를 넣어주면 된다
    dialect: "mysql",
  },
};

module.exports = config;
// module.exports = { config, config2 }; 이런식으로 두개를 내보낼 수도 있다.
