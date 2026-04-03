const categoryModel = require('../models/categoryModel');

const getAll = async () =>{
    const categories = await categoryModel.getAll();
    return categories;
}

const getByid = async (id) =>{
    let rows = await categoryModel.getById(id);
    return rows;
}

const getCategoryById = async (id) =>{
    let rows = await categoryModel.getById(id);
    if(rows.length == 0){
        throw new Error('Category not found!')
    }
    return rows;
}

const create = async (data) =>{
    let result = await categoryModel.create(data);
    const category = await categoryModel.getById(result);
    
    return category
}

const update = async (id,data) => {
    let check_id = await categoryModel.getById(id);
    if(check_id.length == 0){
        throw new Error('Category not found!')
    }
    let result = await categoryModel.update(id, data);
    const category = await categoryModel.getById(id);
    return category;
}

const remove = async (id) =>{
    let check_id = await categoryModel.getById(id);
    if(check_id.length == 0){
        throw new Error('Category not found!')
    }

    let isExists = await categoryModel.categoryExists(id);
    if(isExists.length > 0){
        throw new Error('Cannot delete this category because it is already use in a product')
    }
    
    await categoryModel.deleteCategories(id);
}

module.exports = {
    getAll,
   getCategoryById,
   create,
   update,
   remove
}