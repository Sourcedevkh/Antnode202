const productModel = require('../models/productModel');

const getAll = async () =>{
    let products = await productModel.getAll();
    
    return products;
}

const getByid = async (id) =>{
    let rows = await productModel.getByid(id);
    return rows;
}

const remove = async (id) =>{
    /* Check if product exists */
    let check_id = await productModel.getByid(id);
    if(check_id.length == 0){
        throw new Error('Product not found!')
    }

    /* Check if product is use alreay in order_items */
    let isExists = await productModel.productExists(id);
    if(isExists.length > 0){
        throw new Error('Cannot delete this product because it is already use in an order')
    }

    /* Delete product */
    await productModel.deleteProduct(id);
}

const create = async (body) =>{
    let result = await productModel.create(body);
    
    /* Get the created product */
    const rows = await productModel.getByid(result)
    return rows;
}

const update = async (id, body) =>{
    let check_id = await productModel.getByid(id);
    if(check_id.length == 0){
        throw new Error('Product not found!')
    }
    let result = await productModel.update(id, body);
    
    /* Get the updated product */
    const rows = await productModel.getByid(id)
    return rows;
}

const getPorductById = async (id) =>{
    let rows = await productModel.getByid(id);
    if(rows.length == 0){
        throw new Error('Product not found!')
    }
    return rows;
}
module.exports = {
    getAll,
    create,
    update,
    remove,
    getPorductById
}