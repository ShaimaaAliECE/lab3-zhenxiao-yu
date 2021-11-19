const mysql = require('mysql');

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

module.exports = newConnection;