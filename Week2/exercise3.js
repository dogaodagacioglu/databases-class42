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

//Authors and their mentors

db.query(
  "SELECT authors.author_name, mentors.name AS mentor_name FROM authors LEFT JOIN mentors ON authors.mentor_id = mentors.mentor_id",
  (err, result) => {
    if (err) throw err;
    console.log("authors and their corresponding mentors:");
    // console.log(result);
  }
);

//Authors and their research papers

db.query(
  "SELECT authors.*, research_paper.paper_title FROM authors LEFT JOIN research_papers_authors ON authors.author_id = research_papers_authors.author_id LEFT JOIN research_paper ON research_papers_authors.research_paper_id = research_paper.paper_id",
  (err, result) => {
    if (err) throw err;
    console.log("authors and their research papers mentors:");
    // console.log(result);
  }
);
