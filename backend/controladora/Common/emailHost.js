const nodemailer = require('nodemailer')

module.exports = transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
        user: 'fedemgs15@gmail.com',
        pass: 'frtfpikkxekjftyw'
    }
})

transporter.verify().then(() => {
    console.log('Ready for send emails')
})