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

//create research_Paper

db.query(
  "CREATE TABLE research_paper (paper_id INT NOT NULL AUTO_INCREMENT, paper_title VARCHAR(255), conference VARCHAR(255), publish_date DATETIME, PRIMARY KEY (paper_id))",
  (err) => {
    if (err) throw err;
    console.log("research_paper table created");
  }
);

//create research_papers_authors

db.query(
  "CREATE TABLE research_papers_authors (id INT NOT NULL AUTO_INCREMENT, author_id INT, research_paper_id INT, PRIMARY KEY (id))",
  (err) => {
    if (err) throw err;
    console.log("research_paper table created");
  }
);

db.query(
  "ALTER TABLE research_papers_authors ADD FOREIGN KEY (author_id) REFERENCES authors(author_id)",
  (err) => {
    if (err) throw err;
    console.log("foreign key for authors added");
  }
);

db.query(
  "ALTER TABLE research_papers_authors ADD FOREIGN KEY (research_paper_id) REFERENCES research_paper(paper_id)",
  (err) => {
    if (err) throw err;
    console.log("foreign key for research paper added");
  }
);

//insert authors

const authors = [
  {
    author_id: 1,
    author_name: "John Doe",
    university: "University of Amsterdam",
    date_of_birth: "1980-01-01",
    h_index: 10,
    gender: "Male",
    mentor_id: 5,
  },
  {
    author_id: 2,
    author_name: "Jane Smith",
    university: "University of Copenhagen",
    date_of_birth: "1985-02-14",
    h_index: 8,
    gender: "Female",
    mentor_id: 1,
  },
  {
    author_name: "David Lee",
    university: "Technical University of Munich",
    date_of_birth: "1978-03-15",
    h_index: 12,
    gender: "Male",
    mentor_id: 2,
  },
  {
    author_name: "Sarah Williams",
    university: "University of Edinburgh",
    date_of_birth: "1990-06-23",
    h_index: 7,
    gender: "Female",
    mentor_id: 1,
  },
  {
    author_name: "Peter Brown",
    university: "ETH Zurich",
    date_of_birth: "1982-08-11",
    h_index: 9,
    gender: "Male",
    mentor_id: 7,
  },
  {
    author_name: "Karen Davis",
    university: "University of Cambridge",
    date_of_birth: "1975-04-30",
    h_index: 11,
    gender: "Female",
    mentor_id: 3,
  },
  {
    author_name: "Michael Chen",
    university: "Peking University",
    date_of_birth: "1988-11-18",
    h_index: 6,
    gender: "Male",
    mentor_id: 4,
  },
  {
    author_name: "Emily Wilson",
    university: "University of Oxford",
    date_of_birth: "1987-09-08",
    h_index: 8,
    gender: "Female",
    mentor_id: 6,
  },
  {
    author_name: "Thomas Baker",
    university: "University of California, Berkeley",
    date_of_birth: "1993-07-01",
    h_index: 5,
    gender: "Male",
    mentor_id: 3,
  },
  {
    author_name: "Laura Hernandez",
    university: "Harvard University",
    date_of_birth: "1984-12-25",
    h_index: 14,
    gender: "Female",
    mentor_id: 2,
  },
  {
    author_name: "Benjamin Kim",
    university: "Stanford University",
    date_of_birth: "1981-05-12",
    h_index: 13,
    gender: "Male",
    mentor_id: 8,
  },
  {
    author_name: "Kim Benjamin",
    university: "University of California, Los Angeles",
    date_of_birth: "1989-02-28",
    h_index: 7,
    gender: "Female",
    mentor_id: 5,
  },
  {
    author_name: "John Travolta",
    university: "University of California, Los Angeles",
    date_of_birth: "1989-02-28",
    h_index: 7,
    gender: "Female",
    mentor_id: 1,
  },
  {
    author_name: "Lady Capulet",
    university: "University of California, Los Angeles",
    date_of_birth: "1989-02-28",
    h_index: 7,
    gender: "Female",
    mentor_id: 7,
  },
  {
    author_name: "Eve Adams",
    university: "University of California, Los Angeles",
    date_of_birth: "1989-02-28",
    h_index: 7,
    gender: "Female",
    mentor_id: 6,
  },
];

authors.forEach((author) => {
  db.query("INSERT INTO authors SET ?", author, (err) => {
    if (err) throw err;
    console.log("authors data inserted");
  });
});

// İnsert researchPapers

const researchPapers = [
  {
    paper_title: "Technology singularity",
    conference: "Manhattan conference hall",
    publish_date: "2022-05-05",
  },
  {
    paper_title: "Artificial intelligence and human creativity",
    conference: "Silicon Valley AI Summit",
    publish_date: "2022-07-12",
  },
  {
    paper_title: "The impact of virtual reality on human behavior",
    conference:
      "International Conference on Computer Graphics and Interactive Techniques",
    publish_date: "2023-03-25",
  },
  {
    paper_title: "Blockchain technology for supply chain management",
    conference: "Logistics and Supply Chain Management Conference",
    publish_date: "2022-11-18",
  },
  {
    paper_title:
      "Quantum computing: a paradigm shift in information processing",
    conference: "Quantum Information and Computation Conference",
    publish_date: "2022-09-06",
  },
  {
    paper_title: "The ethics of artificial intelligence",
    conference: "International Symposium on Ethics of Artificial Intelligence",
    publish_date: "2023-06-02",
  },
  {
    paper_title: "Machine learning for personalized medicine",
    conference: "Precision Medicine World Conference",
    publish_date: "2022-08-08",
  },
  {
    paper_title: "Cybersecurity in the age of the Internet of Things",
    conference: "International Conference on Cyber Security",
    publish_date: "2023-01-30",
  },
  {
    paper_title: "The future of transportation: autonomous vehicles",
    conference: "Automated Vehicles Symposium",
    publish_date: "2022-10-15",
  },
  {
    paper_title: "Computational biology: from genomics to drug discovery",
    conference: "International Conference on Computational Biology",
    publish_date: "2023-04-20",
  },
  {
    paper_title: "The role of big data in marketing",
    conference: "Big Data Marketing Conference",
    publish_date: "2022-12-01",
  },
  {
    paper_title: "Digital twins for predictive maintenance",
    conference: "Digital Twins Conference",
    publish_date: "2023-05-10",
  },
  {
    paper_title: "Artificial intelligence and the future of work",
    conference: "Future of Work Conference",
    publish_date: "2022-06-22",
  },
  {
    paper_title: "The impact of social media on mental health",
    conference: "Social Media and Society Conference",
    publish_date: "2023-02-13",
  },
  {
    paper_title: "Machine learning for natural language processing",
    conference:
      "Annual Meeting of the Association for Computational Linguistics",
    publish_date: "2022-09-29",
  },
  {
    paper_title: "The impact of climate change on agriculture",
    conference: "International Agriculture Conference",
    publish_date: "2022-06-15",
  },
  {
    paper_title: "Exploring the use of AI in education",
    conference: "International Education Technology Conference",
    publish_date: "2022-07-20",
  },
  {
    paper_title: "Blockchain technology and its applications",
    conference: "Blockchain Summit",
    publish_date: "2022-08-01",
  },
  {
    paper_title: "The future of transportation with autonomous vehicles",
    conference: "International Transportation Conference",
    publish_date: "2022-09-05",
  },
  {
    paper_title: "The impact of social media on mental health",
    conference: "International Psychology Conference",
    publish_date: "2022-10-10",
  },
  {
    paper_title: "The role of big data in business decision-making",
    conference: "International Business Analytics Conference",
    publish_date: "2022-11-15",
  },
  {
    paper_title: "The ethics of genetic engineering",
    conference: "International Genetics Conference",
    publish_date: "2022-12-01",
  },
  {
    paper_title: "Developing effective cybersecurity strategies for the future",
    conference: "International Cybersecurity Conference",
    publish_date: "2023-01-15",
  },
  {
    paper_title: "The impact of automation on the workforce",
    conference: "International Labor Economics Conference",
    publish_date: "2023-02-20",
  },
  {
    paper_title: "The future of energy with renewable sources",
    conference: "International Energy Summit",
    publish_date: "2023-03-15",
  },
  {
    paper_title: "Exploring the potential of quantum computing",
    conference: "International Quantum Computing Conference",
    publish_date: "2023-04-10",
  },
  {
    paper_title: "The impact of AI on healthcare",
    conference: "International Healthcare Technology Conference",
    publish_date: "2023-05-05",
  },
  {
    paper_title: "The future of space exploration",
    conference: "International Space Science Conference",
    publish_date: "2023-06-20",
  },
  {
    paper_title: "The impact of e-commerce on traditional retail businesses",
    conference: "International E-commerce Summit",
    publish_date: "2023-07-15",
  },
  {
    paper_title: "The impact of virtual reality on education and training",
    conference: "International Virtual Reality Conference",
    publish_date: "2023-08-01",
  },
];

researchPapers.forEach((researchPaper) => {
  db.query("INSERT INTO research_paper SET ?", researchPaper, (err) => {
    if (err) throw err;
    console.log("research papers data inserted");
  });
});

//İnsert researchPapersAuthors

const researchPaperAuthors = [
  { author_id: 1, research_paper_id: 2 },
  { author_id: 2, research_paper_id: 27 },
  { author_id: 3, research_paper_id: 5 },
  { author_id: 4, research_paper_id: 17 },
  { author_id: 8, research_paper_id: 3 },
  { author_id: 6, research_paper_id: 1 },
  { author_id: 7, research_paper_id: 16 },
  { author_id: 8, research_paper_id: 7 },
  { author_id: 9, research_paper_id: 3 },
  { author_id: 10, research_paper_id: 3 },
  { author_id: 11, research_paper_id: 9 },
  { author_id: 12, research_paper_id: 20 },
  { author_id: 13, research_paper_id: 11 },
  { author_id: 14, research_paper_id: 27 },
  { author_id: 15, research_paper_id: 6 },
  { author_id: 1, research_paper_id: 4 },
  { author_id: 13, research_paper_id: 5 },
  { author_id: 11, research_paper_id: 10 },
  { author_id: 1, research_paper_id: 8 },
  { author_id: 9, research_paper_id: 14 },
  { author_id: 9, research_paper_id: 21 },
  { author_id: 1, research_paper_id: 13 },
  { author_id: 12, research_paper_id: 12 },
  { author_id: 1, research_paper_id: 15 },
  { author_id: 6, research_paper_id: 5 },
  { author_id: 5, research_paper_id: 5 },
  { author_id: 7, research_paper_id: 4 },
  { author_id: 8, research_paper_id: 2 },
  { author_id: 4, research_paper_id: 3 },
  { author_id: 12, research_paper_id: 22 },
  { author_id: 13, research_paper_id: 24 },
  { author_id: 1, research_paper_id: 19 },
  { author_id: 8, research_paper_id: 25 },
  { author_id: 12, research_paper_id: 23 },
  { author_id: 1, research_paper_id: 18 },
  { author_id: 2, research_paper_id: 26 },
  { author_id: 13, research_paper_id: 7 },
  { author_id: 14, research_paper_id: 19 },
  { author_id: 11, research_paper_id: 7 },
  { author_id: 2, research_paper_id: 30 },
  { author_id: 4, research_paper_id: 29 },
  { author_id: 15, research_paper_id: 28 },
  { author_id: 14, research_paper_id: 27 },
];

researchPaperAuthors.forEach((researchPaperAuthor) => {
  db.query(
    "INSERT INTO research_papers_authors SET ?",
    researchPaperAuthor,
    (err) => {
      if (err) throw err;
      console.log("research papers authors data inserted");
    }
  );
});
