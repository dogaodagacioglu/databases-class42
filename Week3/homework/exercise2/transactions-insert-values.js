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

const accounts = [
  { account_number: 101, balance: 3000 },
  { account_number: 102, balance: 7000 },
  { account_number: 103, balance: 8000 },
  { account_number: 104, balance: 9000 },
];

accounts.forEach((account) => {
  db.query("INSERT INTO account SET ?", account, (err) => {
    if (err) throw err;
    console.log("data inserted into account table");
  });
});

//(account_number, amount, changed_date, remark) VALUES (101, 10000.00, "2022-04-03", "Initial balance

const transfers = [
  {
    account_number: 101,
    amount: 10000,
    changed_date: "2023-02-22",
    remark: "balance",
  },
  {
    account_number: 102,
    amount: 7000,
    changed_date: "2023-02-22",
    remark: "balance",
  },
  {
    account_number: 103,
    amount: 3000,
    changed_date: "2023-02-22",
    remark: "balance",
  },
  {
    account_number: 104,
    amount: 1000,
    changed_date: "2023-02-22",
    remark: "balance",
  },
];

transfers.forEach((transfer) => {
  db.query("INSERT INTO account_changes SET ?", transfer, (err) => {
    if (err) throw err;
    console.log("data inserted into account_changes table");
  });
});
