const pool = require('../config/db');

const getAll = async () => {
    let [rows] = await pool.query('SELECT * FROM products');
    
    return rows;
}

const create = async (body) =>{
    let arrs = [body.name, body.category_id, body.description, body.price];
    let [result] = await pool.query('INSERT INTO products (name, category_id, description, price) VALUES (?, ?, ?, ?)', arrs);
    return result.insertId;
}

const update = async (id, body) =>{
    let arrs = [body.name, body.category_id, body.description, body.price, id];
    let [result] = await pool.query('UPDATE products SET name = ?, category_id = ?, description = ?, price = ? WHERE id = ?', arrs);
    return result.insertId;
}

const getByid = async (id) => {
    let [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows;
}

const productExists = async (product_id) =>{
    let [rows] = await pool.query('SELECT product_id from order_items WHERE product_id = ?', [product_id]);

    return rows;
}

const deleteProduct = async (id) =>{
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
}

module.exports = {
    getAll,
    create,
    getByid,
    update,
    productExists,
    deleteProduct
}