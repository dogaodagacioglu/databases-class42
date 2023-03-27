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

//All research papers and the number of authors that wrote that paper.

db.query(
  "SELECT research_paper.paper_id, research_paper.paper_title, COUNT(*) as num_authors FROM research_paper INNER JOIN research_papers_authors ON research_paper.paper_id = research_papers_authors.research_paper_id GROUP BY research_paper.paper_id, research_paper.paper_title",
  (err, result) => {
    if (err) throw err;
    console.log(
      "All research papers and the number of authors that wrote that paper:"
    );
  }
);

//Sum of the research papers published by all female authors.

db.query(
  'SELECT COUNT(*) as num_papers_by_female_authors FROM authors INNER JOIN research_papers_authors ON authors.author_id = research_papers_authors.author_id INNER JOIN research_paper ON research_papers_authors.research_paper_id = research_paper.paper_id WHERE authors.gender = "Female"',
  (err, result) => {
    if (err) throw err;
    console.log("Sum of the research papers published by all female authors:");
    //console.log(result);
  }
);

//Average of the h-index of all authors per university.

db.query(
  "SELECT university, AVG(h_index) as avg_h_index FROM authors GROUP BY university",
  (err, result) => {
    if (err) throw err;
    console.log("Average of the h-index of all authors per university:");
    // console.log(result);
  }
);

//Sum of the research papers of the authors per university.

db.query(
  "SELECT university, COUNT(*) as num_papers FROM authors INNER JOIN research_papers_authors ON authors.author_id = research_papers_authors.author_id JOIN research_paper ON research_papers_authors.research_paper_id = research_paper.paper_id GROUP BY university",
  (err, result) => {
    if (err) throw err;
    console.log("Sum of the research papers of the authors per university:");
    // console.log(result);
  }
);

//Minimum and maximum of the h-index of all authors per university.

db.query(
  "SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index FROM authors GROUP BY university",
  (err, result) => {
    if (err) throw err;
    console.log(
      "Minimum and maximum of the h-index of all authors per university:"
    );
    // console.log(result);
  }
);
