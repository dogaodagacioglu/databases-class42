const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});

//What are the names of countries with population greater than 8 million?

db.query(
  "SELECT name FROM country WHERE population > 8000000",
  (err, result) => {
    if (err) throw err;
    console.log("List of countries with a population of more than 8 million:");
    // console.log(result)
  }
);

//What are the names of countries that have “land” in their names?

db.query('SELECT Name FROM country WHERE name LIKE "%land%"', (err, result) => {
  if (err) throw err;
  console.log('List of countries with "land" in their names:');
  // console.log(result);
});

//What are the names of the cities with population in between 500,000 and 1 million?

db.query('SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000', (err, result) => {
  if (err) throw err;
  console.log('List of cities with population between 500,000 and 1 million:');
  // console.log(result);
});

//What's the name of all the countries on the continent ‘Europe’?

db.query('SELECT Name FROM country WHERE Continent = "Europe"', (err, result) => {
  if (err) throw err;
  console.log('List of countries in Europe:');
  // console.log(result);
});

//List all the countries in the descending order of their surface areas.

db.query('SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC', (err, result) => {
  if (err) throw err;
  console.log('List of countries in descending order of their surface areas:');
  // console.log(result);
});

//What are the names of all the cities in the Netherlands?

db.query('SELECT Name FROM city WHERE CountryCode = "NLD"', (err, result) => {
  if (err) throw err;
  console.log('List of cities in the Netherlands:');
  // console.log(result);
});

//What is the population of Rotterdam?

db.query('SELECT Population FROM city WHERE name = "Rotterdam"', (err, result) => {
  if (err) throw err;
  console.log('Population of Rotterdam:');
  // console.log(result);
});

//What's the top 10 countries by Surface Area?

db.query('SELECT Name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10', (err, result) => {
  if (err) throw err;
  console.log('Top 10 countries by surface area:');
  // console.log(result);
});

//What's the top 10 most populated cities?

db.query('SELECT Name, Population FROM city ORDER BY Population DESC LIMIT 10', (err, result) => {
  if (err) throw err;
  console.log('Top 10 most populated cities:');
  // console.log(result);
});

//What is the population number of the world?

db.query('SELECT SUM(Population) as TotalPopulation FROM country', (err, result) => {
  if (err) throw err;
  console.log('Total population of all countries:');
  console.log(result);
});
