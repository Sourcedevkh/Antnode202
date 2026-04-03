const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        let arrs = req.body;
        let result = await authService.create(arrs);
        console.log(result);

        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            userId: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message 
        });
    }
}

const login = async (req, res) => {
    try {
        let arrs = req.body;
        let result = await authService.login(arrs);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Login successful!',
            user: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

const getMe = async (req, res) =>{
    try {
        const row = await authService.getMe(req.user.id);
        res.status(200).json({
            success: true,
            user: row
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

const logout = async (req, res) =>{
    try {
        await authService.logout(req.user.id);
        res.status(200).json({
            success: true,
            message: 'Logout successful!'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}
module.exports = {
    register,
    login,
    getMe,
    logout
}