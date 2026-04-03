const categoryService = require('../services/categoryService');

const getAll = async (req, res) =>{
    try {
        const categories = await categoryService.getAll();
        console.log(categories);
        
        res.status(200).json({
            success: true,
            msg: 'Get categories success.',
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const getById = async (req, res) =>{
    try {
        let id = req.params.id;
        const categoryId = await categoryService.getCategoryById(id);
        res.status(200).json({
            success: true,
            msg: 'Get category success.',
            data: categoryId
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            msg: error.message,
        })
    }
}

const create = async (req, res) =>{
    try {
        let body = req.body;
        let result = await categoryService.create(body);
        console.log(result);
        res.status(201).json({
            success: true,
            msg: 'Category created success',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        let body = req.body;
        let id = req.params.id;
        let result = await categoryService.update(id, body);
        res.status(200).json({
            success: true,
            msg: 'Category updated successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const deleteCategory = async (req, res) =>{
    try {
        let id = req.params.id;
        await categoryService.remove(id);
        res.status(200).json({
            success: true,
            msg: 'Category deleted successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteCategory
}