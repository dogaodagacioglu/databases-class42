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

db.query("CREATE DATABASE IF NOT EXISTS meetup", (err, result) => {
  if (err) throw err;
  console.log(result);
});

db.query("USE meetup", (err) => {
  if (err) throw err;
});

db.query("DROP TABLE invitee");
db.query("DROP TABLE meeting");
db.query("DROP TABLE room");

//create invitee table

db.query(
  "CREATE TABLE invitee (invitee_no INT NOT NULL AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY (invitee_no))",
  (err) => {
    if (err) throw err;
    console.log("invitee table created");
  }
);

db.query(
  "CREATE TABLE room (room_no INT NOT NULL, room_name VARCHAR(255), floor_number INT, PRIMARY KEY(room_no))",
  (err) => {
    if (err) throw err;
    console.log("room table created");
  }
);

db.query(
  "CREATE TABLE meeting (meeting_no INT NOT NULL AUTO_INCREMENT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, PRIMARY KEY (meeting_no), FOREIGN KEY(room_no) REFERENCES room(room_no))",
  (err) => {
    if (err) throw err;
    console.log("meeting table created");
  }
);

const invitees = [
  { invitee_name: "javier Black", invited_by: "Penelope Black" },
  { invitee_name: "Walter White", invited_by: "Jessie Pink" },
  { invitee_name: "Amadeus Mozart", invited_by: "Antonio Salieri" },
  { invitee_name: "Romeo Capulet", invited_by: "Juliet Capulet" },
  { invitee_name: "Esmeralda Hugo", invited_by: "Quasimodo Hugo" },
];

invitees.forEach((invitee) => {
  db.query("INSERT INTO invitee SET ?", invitee, (err) => {
    if (err) throw err;
    console.log("invitee data inserted");
  });
});


const rooms = [
  { room_no: 137, room_name: "interview room1", floor_number: 1 },
  { room_no: 237, room_name: "interview room2", floor_number: 2 },
  { room_no: 337, room_name: "interview room3", floor_number: 3 },
  { room_no: 437, room_name: "interview room4", floor_number: 4 },
  { room_no: 537, room_name: "interview room5", floor_number: 5 },
];

rooms.forEach((room) => {
  db.query("INSERT INTO room SET ?", room, (err) => {
    if (err) throw err;
    console.log("room database inserted");
  });
});


const meetings = [
    {
      meeting_title: "healthy relationships",
      starting_time: "2023-06-07 13:00",
      ending_time: "2023-06-07 16:00",
      room_no: '137',
    },
    {
      meeting_title: "dangerous chemistry",
      starting_time: "2023-07-08 09:00",
      ending_time: "2023-07-08 12:00",
      room_no: '237',
    },
    {
      meeting_title: "Passion of the music",
      starting_time: "2023-10-05 17:00",
      ending_time: "2023-10-05 19:00",
      room_no: '337',
    },
    {
      meeting_title: "tragedy or comedy?",
      starting_time: "2023-10-10 13:00",
      ending_time: "2023-10-10 16:00",
      room_no: '437',
    },
    {
      meeting_title: "humpback of church",
      starting_time: "2023-11-11 12:00",
      ending_time: "2023-11-11 14:00",
      room_no: '537',
    },
  ];
  
  meetings.forEach((meeting) => {
    db.query("INSERT INTO meeting SET ?", meeting, (err) => {
      if (err) throw err;
      console.log("meetings database inserted");
    });
  });
  