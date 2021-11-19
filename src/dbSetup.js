//this is where i will initialize the database

const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'34.133.82.124',
    user: 'root',
    password:'111111',
    database:'userDB'
});

conn.connect();

//if there are tables in place already then reset them
conn.query(`Drop Table Time`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )

conn.query(`Drop Table Users`,
            (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Dropped');
            }
        )


//init the time table with values that only the admin user can edit
conn.query(`CREATE TABLE Time
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
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })

//the int data type is used to represent the true = 1 and false = 0
conn.query(`CREATE TABLE Users
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
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })

conn.query( `insert into Time values (0,1,2,3,5,6,7,8,9,10)`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });

conn.query( `insert into Users values ('Example entry',1,1,1,1,1,1,1,1,1,1)`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('One row inserted');
            });


conn.end();