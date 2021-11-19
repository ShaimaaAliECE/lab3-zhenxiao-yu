//using mysql
const mysql = require("mysql");

//create mysql connection
const conn = mysql.createConnection({
  host: "34.133.82.124",
  user: "root",
  password: "111111",
  database: "userDB",
});

//establish connection with db
conn.connect();

//reset db before creating new tables
//drop TimeSlot table
conn.query(`Drop Table TimeSlot`, (err, rows, fields) => {
  if (err) console.log(err);
  else console.log("Drop Table Success");
});

//drop Availability table
conn.query(`Drop Table Availability`, (err, rows, fields) => {
  if (err) console.log(err);
  else console.log("Drop Table success");
});

//create TimeSlot table
conn.query(
  `CREATE TABLE TimeSlot
            (
                T1 varchar(50),
                T2 varchar(50),
                T3 varchar(50),
                T4 varchar(50),
                T5 varchar(50),
                T6 varchar(50),
                T7 varchar(50),
                T8 varchar(50),
                T9 varchar(50),
                T10 varchar(50)
            )
            `,
  (err, rows, fields) => {
    if (err) console.log(err);
    else console.log("Table Created");
  }
);


//create Availability table
conn.query(
  `CREATE TABLE Availability
            (
                Name varchar(100),
                T1 varchar(100),
                T2 varchar(100),
                T3 varchar(100),
                T4 varchar(100),
                T5 varchar(100),
                T6 varchar(100),
                T7 varchar(100),
                T8 varchar(100),
                T9 varchar(100),
                T10 varchar(100)
            )
            `,
  (err, rows, fields) => {
    if (err) console.log(err);
    else console.log("Table Created");
  }
);

//populate the tables with sample data
conn.query(
  `insert into Availability values ('Bob',1,1,0,0,1,0,0,1,0,1)`,
  (err, rows, fields) => {
    if (err) console.log(err);
    else console.log("Inserted sample data into Availability");
  }
);

conn.query(
    `insert into TimeSlot values (1,2,3,4,5,6,7,8,9,10)`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else console.log("Inserted sample data into TimeSlot");
    }
);

conn.end();
