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

db.query("CREATE DATABASE IF NOT EXISTS homework_w3", (err, result) => {
  if (err) throw err;
  console.log(result);
});

db.query("USE homework_w3", (err) => {
  if (err) throw err;
});

//create account table

db.query(
  "CREATE TABLE IF NOT EXISTS account (account_number INT NOT NULL, balance INT NOT NULL, PRIMARY KEY (account_number))",
  (err) => {
    if (err) throw err;
    console.log("account table created");
  }
);

//create account_changes table

db.query(
  "CREATE TABLE IF NOT EXISTS account_changes (change_number INT NOT NULL AUTO_INCREMENT , account_number INT,amount INT, changed_date DATE NOT NULL, remark VARCHAR(255), PRIMARY KEY (change_number), FOREIGN KEY (account_number) REFERENCES account (account_number))",
  (err) => {
    if (err) throw err;
    console.log("account changes table created");
  }
);
