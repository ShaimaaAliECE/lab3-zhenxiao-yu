//using dbConfig class to establish mysql connection
const newConnection = require("./dbConfig");
const conn = newConnection();

//get data from database
conn.query(`select * from TimeSlot `, (err, rows, fields) => {
  for (r of rows) console.log(r);
});

conn.query(`select * from Availability `, (err, rows, fields) => {
  for (r of rows) console.log(r);
});

conn.end();
