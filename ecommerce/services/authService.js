const user = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const crypto = require('crypto');
const emailService = require('./emailService')

const getExpiryFromToken = (token) => {
    const payload = jwt.decode(token);
    if (!payload || !payload.exp) {
        return null;
    }
    return new Date(payload.exp * 1000);
};

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
    const verificationToken = crypto.randomBytes(37).toString('hex'); 
    const verificationExpired = new Date(Date.now() + 5 * 60 * 1000); // Token expires in 60 minutes
    console.log(verificationToken);

    let result = await user.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        verificationToken,
        verificationExpired
    })

    await emailService.sendVerificationEmail(body.email, verificationToken);

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

    if(!userInfo[0].is_verified){
        throw new Error('Please verify your email before logging in');
    }

    // Generate tokens
    let accessToken = jwt.sign(
        {id: userInfo[0].id, email: userInfo[0].email},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expiresIn}
    );

    // Middleware validates token existence in users.token, so keep it in sync at login.
    await user.addToken(accessToken, userInfo[0].id);

    let refreshToken = jwt.sign(
        {id: userInfo[0].id, email: userInfo[0].email},
        jwtConfig.refreshSecret,
        {expiresIn: jwtConfig.refreshExpiresIn}
    );

    const expiresAt = getExpiryFromToken(refreshToken);
    if (!expiresAt) {
        throw new Error('Unable to build refresh token session');
    }

    console.log("expirese", expiresAt);
    

    // Save refresh token to database
    await user.addRefreshToken(userInfo[0].id, refreshToken, expiresAt);

    const [profile] = await user.findById(userInfo[0].id);
    return { user: profile, accessToken, refreshToken };
    

    // const token = jwt.sign(
    //     // Payload
    //     { id: userInfo[0].id, email: userInfo[0].email },

    //     // Secret key and options
    //     jwtConfig.secret,
    //     { expiresIn: jwtConfig.expiresIn }
    // );

    // Save token to database
    // await user.addToken(token, userInfo[0].id);
    // let [row] = await user.findById(userInfo[0].id);
    // return row;
}

const getMe = async (id) => {
    const row = await user.findById(id);

    return row;
}

const logout = async (id) =>{
    await user.deleteToken(id);
    await user.deleteRefreshTokensByUserId(id);
}

const verifyEmail = async (token) =>{
    if(!token){
        throw new Error('Token is required');
    }
    let userInfo = await user.findByVerificationEmail(token);
    if(userInfo.length == 0){
        throw new Error('Invalid token');
    }

    if(userInfo[0].is_verified){
        throw new Error('Email already verified');
    }
    
    if(!userInfo[0].verification_expires || new Date(userInfo[0].verification_expires) < new Date()){
        throw new Error('Link verification expired, please register again');
    }

    await user.verifyEmail(userInfo[0].id);
    return {message: 'Email verified success.'};    
}

const resendVerificationLink = async (email) =>{
    if(!email){
        throw new Error('Email is required');
    }
    let userInfo = await user.findByEmail(email);

    if(userInfo.length == 0){
        throw new Error('Email not found');
    }

    if(userInfo[0].is_verified){
        throw new Error('Email already verified');
    }

    const verification_token = crypto.randomBytes(37).toString('hex');
    const verification_expires = new Date(Date.now() + 60 * 60 * 1000); //60min or 1h

    await user.resendVerificationLink({
        id : userInfo[0].id,
        verification_token,
        verification_expires
    })

    await emailService.sendVerificationEmail(email, verification_token);
    return {message: 'Resend Success'}
}

const refresh = async (oldRefreshToken) =>{

    if (!oldRefreshToken) {
        throw new Error('refreshToken is required');
    }

    let row = await user.getRefreshToken(oldRefreshToken);
    if(row.length == 0){
        throw new Error('Session not found');
    }

    if (row[0].expires_at && new Date(row[0].expires_at) < new Date()) {
        await user.deleteRefreshToken(oldRefreshToken);
        throw new Error('Refresh token expired');
    }
    
    const tokenData = row[0];
    console.log(tokenData);
    try {
        const decoded = jwt.verify(oldRefreshToken, jwtConfig.refreshSecret);
        console.log(decoded);
        await user.deleteRefreshToken(oldRefreshToken);

        const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
        const newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email }, jwtConfig.refreshSecret, { expiresIn: jwtConfig.refreshExpiresIn });

        
        const expiresAt = getExpiryFromToken(newRefreshToken);
        if (!expiresAt) {
            throw new Error('Unable to build refresh token session');
        }
        await user.addRefreshToken(decoded.id, newRefreshToken, expiresAt);
        await user.addToken(newAccessToken, decoded.id);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        
    } catch (error) {
        await user.deleteRefreshToken(oldRefreshToken);
        throw new Error('Refresh token expired');
    }  
}

module.exports = {
    create,
    login,
    getMe,
    logout,
    verifyEmail,
    resendVerificationLink,
    refresh
}