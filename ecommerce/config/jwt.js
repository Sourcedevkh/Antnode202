let jwtConfig = {
    secret: 'mysecretkey',
    expiresIn: '1d', 
    refreshSecret: 'myrefreshsecretkey',
    refreshExpiresIn: '1d'
};
module.exports = jwtConfig;