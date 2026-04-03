const user = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const create = async (body) => {
    if (!body.name || !body.email || !body.password) {
        throw new Error('Name, email and password are required!')
    }

    let check_email = await user.findByEmail(body.email);
    console.log(check_email);
    if (check_email.length > 0) {
        throw new Error('Email already exists!')
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(hashedPassword);

    let result = await user.create({
        name: body.name,
        email: body.email,
        password: hashedPassword
    })

    let rows = await user.findById(result);
    return rows;
}

const login = async (body) => {
    if (!body.email || !body.password) {
        throw new Error('Email and password are required!')
    }
    let userInfo = await user.findByEmail(body.email);
    if (userInfo.length == 0) {
        throw new Error('Email and password invalid')
    }
    console.log(userInfo);
    const isMatch = await bcrypt.compare(body.password, userInfo[0].password);
    if (!isMatch) {
        throw new Error('Email and password invalid')
    }

    const token = jwt.sign(
        // Payload
        { id: userInfo[0].id, email: userInfo[0].email },

        // Secret key and options
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    // Save token to database
    await user.addToken(token, userInfo[0].id);
    let [row] = await user.findById(userInfo[0].id);
    return row;
}

const getMe = async (id) => {
    const row = await user.findById(id);

    return row;
}

const logout = async (id) =>{
    await user.deleteToken(id);
}

module.exports = {
    create,
    login,
    getMe,
    logout
}