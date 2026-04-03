const pool = require('../config/db');

/* Parameters that will give is object */
const create = async (body) => {
    let arrs = [body.name, body.email, body.password];
    let [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', arrs);
    return result.insertId;
}

const findById = async (id) => {
    let [rows] = await pool.query('SELECT id, name, email, phone, address, role, is_active, token FROM users WHERE id = ?', [id]);
    return rows;
}

const findByEmail = async (email) => {
    let [rows] = await pool.query('SELECT id, email, password, phone, address, role, is_active FROM users WHERE email = ?', [email]);
    return rows;
}

const addToken = async (token, id) => {
    await pool.query('UPDATE users SET token = ? WHERE id = ?', [token, id]);
}

const getToken = async (token) =>{
    let [row] = await pool.query('SELECT token FROM users WHERE token = ?', [token]);
    return row;
}

const deleteToken = async (id) =>{
    await pool.query('UPDATE users SET token = NULL WHERE id = ?', [id]);

}

module.exports = {
    create,
    findById,
    findByEmail,
    addToken,
    getToken,
    deleteToken
}