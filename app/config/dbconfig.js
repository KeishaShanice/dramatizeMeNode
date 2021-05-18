const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '_R00t13_',
    database: 'Korean_Dramas'
});

module.exports = pool;