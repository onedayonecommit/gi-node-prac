// mysql 편하게 쓰기
// sequelize
// 관계형 데이터 베이스 만들어보기

const mysql = require("mysql2");
const config = require("./config");

console.log(config);

let connection = mysql.createConnection(config.dev);

const sql =
  "CREATE TABLE users (id INT AUTO_INCREMENT, username varchar(255), PRIMARY KEY (id));";
const sql2 =
  "CREATE TABLE items (id INT AUTO_INCREMENT,name varchar(255),price INT,image varchar(255),PRIMARY KEY (id));";
const sql3 =
  "CREATE TABLE orders (id INT AUTO_INCREMENT,user_id INT,total_price INT,created_at datetime DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY (id));";
const sql4 =
  "CREATE TABLE order_items (id INT AUTO_INCREMENT,order_id INT,item_id INT,order_quantity INT,PRIMARY KEY (id));";
const sql5 =
  "ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users (id);";
const sql6 =
  "ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders (id);";
const sql7 =
  "ALTER TABLE order_items ADD FOREIGN KEY (item_id) REFERENCES items (id);";
// connection.query(sql5 + sql6 + sql7);

// select 부분이 찾을 값들 from 전까지
// inner join order_items ON (order_items.item_id = items.id)
// order_items의 item_id 값이랑 items 테이블의 id값이랑 같은 값을 합친다.
// INNER JOIN 두 개의 테이블이 공통된 부분만(참조된 것들) 합치는 것
// id, user_id, order_id, item_id 끼리 합쳐짐

const sql13 = `SELECT orders.id, orders.created_at,
  orders.total_price, items.name, items.price, items.image,
  order_items.order_quantity FROM items
  INNER JOIN order_items ON (order_items.item_id = items.id)
  INNER JOIN orders ON (orders.id = order_items.order_id)
  WHERE (orders.user_id = ?)`;

const sql8 = `insert into items (name, price, image) values ('첫번째',1000,"/"),
('두번째',2000,"/");`;

const sql9 = `insert into users (username) values ("안녕");`;

// connection.query(sql8 + sql9);

connection.query(sql13, [1], (err, result) => {
  console.log(result);
});
