const pool = require('../config/db');

const create = async (body) => {
    let arrs = [body.name, body.email, body.password];
    let [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', arrs);
    return result.insertId;
}

const getByEmail = async (email) => {
    let [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows;
}

const getByPwd = async (password) =>{
    let [rows] = await pool.query('SELECT * FROM users WHERE password = ?', [password]);
    return rows;
}

const getByid = async (id) => {
    let [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows;
}

const getAll = async () =>{
    let [rows] = await pool.query('SELECT id, name, email, created_at FROM users');
    return rows;
}


module.exports = {
    create,
    getByEmail,
    getByid,
    getByPwd,
    getAll
}