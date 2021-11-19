//using mysql
const mysql = require('mysql');

//create connection to mysql db
function newConnection()
{
    let conn = mysql.createConnection({
        host:'34.133.82.124',
        user: 'root',
        password:'111111',
        database:'userDB'
    });
    return conn;
}

//export module 
module.exports = newConnection;