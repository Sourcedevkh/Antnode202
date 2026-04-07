const pool = require('../config/db');

/* Parameters that will give is object */
const create = async (body) => {
    let arrs = [body.name, body.email, body.password, body.verificationToken, body.verificationExpired];
    let [result] = await pool.query('INSERT INTO users (name, email, password, verification_token, verification_expires) VALUES (?, ?, ?, ?, ?)', arrs);
    return result.insertId;
}

const findById = async (id) => {
    let [rows] = await pool.query('SELECT id, name, email, phone, address, role, is_active FROM users WHERE id = ?', [id]);
    return rows;
}

const findByEmail = async (email) => {
    let [rows] = await pool.query('SELECT id, email, password, phone, address, role, is_active, is_verified FROM users WHERE email = ?', [email]);
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

const findByVerificationEmail = async (token) =>{
    let [rows] = await pool.query('SELECT id, name, email, phone, address, role, is_active, token, is_verified, verification_token, verification_expires FROM users WHERE verification_token = ?', [token]);
    return rows;
}

const verifyEmail = async (id) => {
    await pool.query('UPDATE users SET is_verified = 1 WHERE id = ?', [id]);
}

const resendVerificationLink = async (body) => {
    let arr = [body.verification_token, body.verification_expires, body.id];
    await pool.query('update users set verification_token = ?, verification_expires = ? where id = ?', arr)
}





// const addRefreshToken = async (userId, token, expiresAt) => {
//     await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [userId, token, expiresAt]);
// }

// const getRefreshToken = async (token) =>{
//     let [row] = await pool.query('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
//     return row;
// }

// const deleteRefreshToken = async (token) =>{
//     await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
// }

// const deleteRefreshTokensByUserId = async (userId) => {
//     await pool.query('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
// }
module.exports = {
    create,
    findById,
    findByEmail,
    addToken,
    getToken,
    deleteToken,
    findByVerificationEmail,
    verifyEmail,
    resendVerificationLink
    // addRefreshToken,
    // getRefreshToken,
    // deleteRefreshToken,
    // deleteRefreshTokensByUserId
}