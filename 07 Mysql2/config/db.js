const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12022005',
    database: 'ecommerce_v2'
})

module.exports = pool;
