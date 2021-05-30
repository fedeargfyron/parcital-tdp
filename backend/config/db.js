require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connection success")
    } catch (error) {
        console.error('data import failed')
        process.exit(1)
    }

}

module.exports = connectDB