const authService = require('../services/authService');

const create = async (req, res) =>{
    try {
        let arrs = req.body;
        let result = await authService.create(arrs);
        res.status(201).json({
            success: true,
            msg: 'User created success.',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const login = async (req, res) =>{
    try {
        let arrs = req.body;
        let result = await authService.login(arrs);
        res.status(200).json({
            success: true,
            msg: 'Login success.',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

const getAllUsers = async (req, res) =>{
    try {
        let result = await authService.getAllUsers();
        res.status(200).json({
            success: true,
            msg: 'Get all users success.',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

module.exports = {
    create,
    login,
    getAllUsers
}