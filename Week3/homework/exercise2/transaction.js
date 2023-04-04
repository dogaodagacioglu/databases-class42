const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "homework_w3",
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected...");
});

db.query(
  "UPDATE account SET balance = balance-1000 WHERE account_number = 101",
  (err) => {
    if (err) {
      throw err;
    }
    console.log("1000 euros was sent from the account 101");
  }
);

db.query(
  "UPDATE account SET balance = balance+1000 WHERE account_number = 102",
  (err) => {
    if (err) {
      throw err;
    }
    console.log("1000 euros deposited to the account 102");
  }
);

db.query(
  'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, "2023-05-10","Money transfer from account 101 to account 102")',
  (err) => {
    if (err) {
      throw err;
    }
  }
);
db.query(
  'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, 1000, "2023-05-10","Money transfer from account 101 to account 102")',
  (err) => {
    if (err) {
      throw err;
    }
  }
);

db.query("COMMIT", (err) => {
  if (err) {
    throw err;
  }
  console.log("Transfer complete.");
});
