const authModel = require('../models/authModel');

const create = async (body) =>{
    let name = body.name;

    if(!name){
        throw new Error('Name is required!')
    }else if(!body.email){
        throw new Error('Email is required!')
    }else if(!body.password){
        throw new Error('Password is required!')
    }
    
    let check_email = await authModel.getByEmail(body.email);
    if(check_email.length > 0){
        throw new Error('Email already exists!')
    }
    
    let result = await authModel.create(body);
    let rows = await authModel.getByid(result);
    return rows;
}

const login = async (body) =>{
    
    let { email, password } = body;

    if(!email){
        throw new Error('Email is required!')
    }else if(!password){
        throw new Error('Password is required!')
    }

    let [users] = await authModel.getByEmail(email);
    if(!users){
        throw new Error('Email not found!')
    }

    if(users.password !== password){
        throw new Error('Password is incorrect!')
    }
    
    let rows = await authModel.getByEmail(email);
    return rows;
}

const getAllUsers = async () =>{
    let result = await authModel.getAll();
    return result;
}

module.exports = {
    create,
    login,
    getAllUsers
}