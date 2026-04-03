const productService = require('../services/productService');

const getAll = async (req, res) => {
    try {
        let rows = await productService.getAll();
        res.status(200).json({
            success: true,
            msg: 'Get products success.',
            data: rows
        })
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            msg: 'Error fetching products'
        });
    }
}

const getById = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await productService.getPorductById(id);
        res.status(200).json({
            success: true,
            msg: 'Get product success.',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const create = async (req, res) => {
    try {
        let body = req.body;
        let [result] = await productService.create(body);
        // console.log(result);
        res.status(201).json({
            success: true,
            msg: 'product created successfully',
            data: result

        })
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let result = await productService.update(id, body);
        
        res.status(200).json({
            success: true,
            msg: 'product updated successfully',
            data: result[0]
        })
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            msg: error.message
        });

    }
}


const deleteProduct = async (req, res) =>{
    try {
        let id = req.params.id;
        await productService.remove(id);
        res.status(200).json({
            success: true,
            msg: 'Product deleted successfully',
        })
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
}


module.exports = { getAll, create, updateProduct, deleteProduct, getById }