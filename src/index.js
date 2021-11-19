const express = require('express');
const path = require('path');

//this object can be used to create new db connections 
const newConnection = require('./dbConfig');

const app = express();

app.get('/timeDisplay', (req, res) => {
  let conn = newConnection();
  conn.connect();
  let timeList;
  conn.query(`select * from Time`, (err,rows,fields) => {

      if (err)
          res.send('ERROR: ' + err)
      else
      {
          timeList = rows;

          let content ='';

          content += '<div> T1 : T2 : T3 : T4 : T5 : T6 : T7 : T8 : T9 : T10 </div>';
          content += '\n';
          for (t of timeList)
          {
              content += '<div>';
              content += t.T1 + " : " + t.T2 + " : " + t.T3 + " : " + t.T4 + " : " + t.T5 + " : " + t.T6 + " : " + t.T7 + " : " + t.T8 + " : " + t.T9 + " : " + t.T10 
              content += '</div>'
              content += '\n';
          }
          content += '<br/>';
          content += `<a href='/'>Click here to return to the homepage</a>`;

          res.send(content);
      }
  })    
})

app.get('/userDisplay', (req, res) => {
  let conn = newConnection();
  conn.connect();
  let userList;
  conn.query(`select * from Users`, (err,rows,fields) => {

      if (err)
          res.send('ERROR: ' +err)
      else
      {
          userList = rows;

          let content ='';
          for (u of userList)
          {
              content += '<div>';
              content += u.Name + " : " + u.T1 + " : " + u.T2 + " : " + u.T3 + " : " + u.T4 + " : " + u.T5 + " : " + u.T6 + " : " + u.T7 + " : " + u.T8 + " : " + u.T9 + " : " + u.T10 
              content += '</div>'
              content += '\n';
              content += '\n';
          }
          content += '<br/>';
          content += `<a href='/'>return to the home</a>`;

          res.send(content);
      }
  })    
})

app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.sendFile('/view/index.html', { root: __dirname })
})

app.get('/guest', (req, res) => {
  res.sendFile('/view/guest.html', { root: __dirname })
})

app.get('/admin', (req, res) => {
  res.sendFile('/view/admin.html', { root: __dirname })
})

app.get('/login', (req, res) => {
  let userName = req.query.usr;
  let password = req.query.pwd;

  if (userName == 'admin' && password == '123') {
    message = "Welcome";
    res.sendFile('/view/admin.html', { root: __dirname })
  }
  else 
  {
    res.sendFile('/view/index.html', { root: __dirname })
  }

})

app.get('/add-user', (req,res) => {
  let conn = newConnection();
  conn.connect();
  conn.query(`insert into Users values ('${req.query.name}','${req.query.T1}','${req.query.T2}','${req.query.T3}','${req.query.T4}','${req.query.T5}','${req.query.T6}','${req.query.T7}','${req.query.T8}','${req.query.T9}','${req.query.T10}')`
          ,(err,rows,fields) => {
              res.redirect('/userDisplay');        
          } );

  conn.end();
})

app.get('/add-times', (req,res) => {
  let conn = newConnection();
  conn.connect();
  conn.query( `UPDATE Time SET  T1 = '${req.query.T1}', T2 = '${req.query.T2}', T3 = '${req.query.T3}', T4 = '${req.query.T4}', T5 = '${req.query.T5}', T6 = '${req.query.T6}', T7 = '${req.query.T7}', T8 = '${req.query.T8}', T9 = '${req.query.T9}', T10 = '${req.query.T10}'`
          , (err,rows,fields) => {
              if (err)
                  console.log(err);
              else
                  console.log('row updated');
                  res.redirect('/timeDisplay');
          });

  conn.end();
})

app.use(express.static('view'))
// make the app listen to port 80 as specified in the project instructions
// part 6 of the development section adresses this 
app.listen(80);