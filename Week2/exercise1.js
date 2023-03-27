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
  "CREATE TABLE authors (author_id INT NOT NULL AUTO_INCREMENT, author_name VARCHAR(255), university VARCHAR(255),date_of_birth DATETIME, h_index INT, gender VARCHAR(255), PRIMARY KEY (author_id))",
  (err) => {
    if (err) throw err;
    console.log("authors table created");
  }
);

//create mentors table

db.query(
  "CREATE TABLE mentors (mentor_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(mentor_id))",
  (err) => {
    if (err) throw err;
    console.log("mentors table created");
  }
);

db.query("ALTER TABLE authors ADD COLUMN mentor_id INT", (err) => {
  if (err) throw err;
  console.log("column mentor added");
});

db.query(
  "ALTER TABLE authors ADD FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id)",
  (err) => {
    if (err) throw err;
    console.log("foreign key for mentor added");
  }
);

//insert mentors

const mentors = [
  { name: "rob" },
  { name: "Utku" },
  { name: "Obada" },
  { name: "Özgür" },
  { name: "josephine" },
  { name: "Alejandro" },
  { name: "John" },
  { name: "Saed" },
];

mentors.forEach((mentor) => {
  db.query("INSERT INTO mentors SET ?", mentor, (err) => {
    if (err) throw err;
    console.log("mentors data inserted");
  });
});
