const { MongoClient } = require('mongodb')
require('dotenv').config()

const MongoClientCreator = async (collection, pipeline) => {
    const uri = process.env.MONGO_URL
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    const aggCursor = client.db('Inmobiliaria').collection(collection).aggregate(pipeline)
    return aggCursor
}

module.exports = MongoClientCreator