const nodemailler = require('nodemailer');

const transporter = nodemailler.createTransport({
    host: 'localhost',
    service: 'gmail',
    auth:{
        user: 'khonchanphearaa@gmail.com',
        pass: 'uolsowzrkeefvvjh'
    }
})

module.exports = transporter;