let jwtConfig = {
    secret: 'mysecretkey',
    expiresIn: '2m', 
    refreshSecret: 'myrefreshsecretkey',
    refreshExpiresIn: '1d'
};
module.exports = jwtConfig;