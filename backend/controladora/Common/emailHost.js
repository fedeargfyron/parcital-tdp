const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
        user: 'fedemgs15@gmail.com',
        pass: process.env.NODEMAILER_PASS
    }
})

transporter.verify().then(() => {
    console.log('Ready for send emails')
})