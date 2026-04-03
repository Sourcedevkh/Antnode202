const pool = require('../config/db');

const getAll = async () =>{
    let [rows] = await pool.query('SELECT * FROM categories');
    return rows;
}

const getById = async (id) =>{
    let [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows;
}

let create = async (data) =>{
    let arrs = [data.name];
    let [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', arrs);
    
    return result.insertId;
}

let update = async (id, data) =>{
    let arrs = [data.name, id];
    let [result] = await pool.query('UPDATE categories SET name = ? WHERE id = ?', arrs);
    return result.insertId;
}

const categoryExists = async (category_id) =>{
    let [rows] = await pool.query('SELECT category_id from products WHERE category_id = ?', [category_id]);
    return rows;
}

let deleteCategories = async (id) =>{
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]); 
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    categoryExists,
    deleteCategories
}