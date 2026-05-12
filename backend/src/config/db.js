const mysql = require('mysql2');

//connection
const pool = mysql.createPool ({
    host: 'localhost',       
    user: 'root',            
    password: '',         
    database: 'upv_pawtrol',  
    waitForConnections: true,
    connectionLimit: 10,   // accomm only 10 people at the same time
    queueLimit: 0
});

const db = pool.promise();
module.exports = db; 