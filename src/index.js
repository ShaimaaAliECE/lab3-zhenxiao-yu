//using express
const express = require("express");
const path = require("path");

//using dbConfig class to establish mysql connection
const newConnection = require("./dbConfig");

//instance of express app
const app = express();

//get request: display timeslots as defined by the admin
app.get("/timeDisplay", (req, res) => {
  let conn = newConnection();
  conn.connect();
  let timeList;
  conn.query(`select * from TimeSlot`, (err, rows, fields) => {
    if (err) res.send("ERROR: " + err);
    else {
      timeList = rows;
      //define empty variable for storing content
      let content = "";
      content += "\n";
      for (t of timeList) {
        content += `<div style="text-align: center; font-size: 35px; font-weight: bold; font-family: 'Roboto', sans-serif; background-color: rgb(251, 255, 255); margin-top:20%"`;
        content += `<div>`;
        content +=
          "TimeSlot 1  : " + t.T1 + `</br>` +
          "TimeSlot 2  : " + t.T2 + `</br>` +
          "TimeSlot 3  : " + t.T3 + `</br>` +
          "TimeSlot 4  : " + t.T4 + `</br>` +
          "TimeSlot 5  : " + t.T5 + `</br>` +
          "TimeSlot 6  : " + t.T6 + `</br>` +
          "TimeSlot 7  : " + t.T7 + `</br>` +
          "TimeSlot 8  : " + t.T8 + `</br>` +
          "TimeSlot 9  : " + t.T9 + `</br>` +
          "TimeSlot 10 : " + t.T10 + `</br>`;
        content += `</div>`;
        content += "\n";
      }
      content += "<br/>";
      content += `<a style=" text-decoration: none; font-family: 'Roboto', sans-serif; color: rgba(7, 7, 7, 0.596); margin-left:50%;" href='/'>return</a>`;
      content+=`</div>`
      res.send(content);
    }
  });
});

//get request: display user and their availabilities
app.get("/userDisplay", (req, res) => {
  let conn = newConnection();
  conn.connect();
  let userList;
  conn.query(`select * from Availability`, (err, rows, fields) => {
    if (err) res.send("ERROR: " + err);
    else {
      userList = rows;
      //define empty variable for storing content
      let content = "";
      for (u of userList) {
        content += `<div style="text-align: center; font-size: 20px; font-weight: bold; font-family: 'Roboto', sans-serif; background-color: rgb(251, 255, 255); margin-top:5px"`;
        content+=`<div>`
        content +=
          u.Name +
          " : " +
          u.T1 +
          " : " +
          u.T2 +
          " : " +
          u.T3 +
          " : " +
          u.T4 +
          " : " +
          u.T5 +
          " : " +
          u.T6 +
          " : " +
          u.T7 +
          " : " +
          u.T8 +
          " : " +
          u.T9 +
          " : " +
          u.T10;
        content+=`</div>`
        content += "\n";
        content += "\n";
      }
      content += "<br/>";
      content += "<br/>";
      content += `<a style=" text-decoration: none; font-family: 'Roboto', sans-serif; color: rgba(7, 7, 7, 0.596); margin-left:50%;" href='/'>return</a>`;
      content += `</div>`;

      res.send(content);
    }
  });
});

//middleware for parsing bodies from URL
app.use(
  express.urlencoded({
    extended: true,
  })
);
//--------------access view pages----------------------

//get request: path to index page
app.get("/", (req, res) => {
  res.sendFile("/view/index.html", { root: __dirname });
});

//get request: path to admin page
app.get("/admin", (req, res) => {
  res.sendFile("/view/admin.html", { root: __dirname });
});

//get request: path to guest page
app.get("/guest", (req, res) => {
  res.sendFile("/view/guest.html", { root: __dirname });
});

//get request: validate admin credentials
app.get("/login", (req, res) => {
  //get information from index.html
  let userName = req.query.username;
  let password = req.query.password;
  if (userName == "admin" && password == "111111") {
    message = "Welcome";
    res.sendFile("/view/admin.html", { root: __dirname });
  } else {
    message = "login failed";
    res.sendFile("/view/index.html", { root: __dirname });
  }
});

//get request: add/update time in TimeSlot table
app.get("/add-times", (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query(
    `UPDATE TimeSlot SET  T1 = '${req.query.T1}', T2 = '${req.query.T2}', T3 = '${req.query.T3}', T4 = '${req.query.T4}', T5 = '${req.query.T5}', T6 = '${req.query.T6}', T7 = '${req.query.T7}', T8 = '${req.query.T8}', T9 = '${req.query.T9}', T10 = '${req.query.T10}'`,
    (err, rows, fields) => {
      if (err) console.log(err);
      else console.log("row updated");
      //redirect to page showing the newly defined time slots
      res.redirect("/timeDisplay");
    }
  );
  //end connection
  conn.end();
});

//get request: add new user to Availability table
app.get("/add-user", (req, res) => {
  let conn = newConnection();
  conn.connect();
  conn.query(
    `insert into Availability values ('${req.query.name}','${req.query.T1}','${req.query.T2}','${req.query.T3}','${req.query.T4}','${req.query.T5}','${req.query.T6}','${req.query.T7}','${req.query.T8}','${req.query.T9}','${req.query.T10}')`,
    (err, rows, fields) => {
      //redirect to list containing user names and their availabilities
      res.redirect("/userDisplay");
    }
  );
    //end connection
  conn.end();
});

//use the static pages from view
app.use(express.static("view"));
//listens to port 80
app.listen(80);
