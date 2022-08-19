// sequelize 사용
// 폴더명 까지만 경로를 작성해줬을 때 index.js를 기본으로 찾아온다.
const { sequelize } = require("./model");

// 처음에 연결할 때 테이블들의 값을 초기화 할 것 인지
// true이면 기존 테이블들을 초기화 하고 false 면 초기화 하지 않는다.
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("연결 success");
  })
  .catch((err) => {
    console.log(err);
  });
