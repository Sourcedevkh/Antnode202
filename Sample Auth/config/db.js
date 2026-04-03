const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12022005',
    database: 'auth_exercise'
});

module.exports = pool;  