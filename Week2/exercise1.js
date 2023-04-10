const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected...");
});

//create db

db.query("CREATE DATABASE IF NOT EXISTS data", (err, result) => {
  if (err) throw err;
  console.log(result);
});

db.query("USE data", (err) => {
  if (err) throw err;
});

//create authors table

db.query(
  `CREATE TABLE authors (
  author_id INT NOT NULL AUTO_INCREMENT,
  author_name VARCHAR(255),
  university VARCHAR(255),
  date_of_birth DATETIME,
  h_index INT,
  gender VARCHAR(255),
  PRIMARY KEY (author_id))`,
  (err) => {
    if (err) throw err;
    console.log("authors table created");
  }
);

db.query("ALTER TABLE authors ADD mentor_id INT", (err) => {
  if (err) throw err;
  console.log("column mentor added");
});

db.query(
  "ALTER TABLE authors ADD CONSTRAINT fk_mentor_id FOREIGN KEY (mentor_id) REFERENCES authors(author_id)",
  (err) => {
    if (err) throw err;
    console.log("foreign key for mentor added");
  }
);
