// index.js 가 model js파일들을 모아서 사용하는 곳
const Sql = require("sequelize");
// const dotenv = require("dotenv").config();
// config.js에서 module.exports = config 내보내기를 하고
// require로 가져오기
const config = require("../config/config");
const User = require("./users");
const Post = require("./posts");
// 시퀄라이즈 객체 생성 옵션을 적용한 객체 만들어 놓는다.
const sequelize = new Sql(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

// 내보내기 위해서 빈 객체를 만든 것.
const db = {};
// 그 빈객체에 sequelize 키값으로 시퀄라이즈 객체 만든것을 넣어줌.
// User도 같이 내보내서 사용
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
// 이 구문이 없으면 테이블이 생성되지 않는다.
User.init(sequelize);
Post.init(sequelize);

User.associate(db);
Post.associate(db);
// 보내고 싶은 값을 다 넣은 객체를 이제 내보냄
module.exports = db;
