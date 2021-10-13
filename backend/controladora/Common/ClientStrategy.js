const { MongoClient } = require('mongodb')
require('dotenv').config()

function ClientStrategy() {
    this.strategy = {}
    this.collection = ""
    this.pipeline = []
}

ClientStrategy.prototype = {
    setStrategy: (strategy) => {
        this.strategy = strategy
        this.collection = strategy.collection
    },
    pipelineCreator: (filtros) => {
        pipeline = this.strategy.pipelineCreator(filtros)
    },
    execute: async () => {
        const uri = process.env.MONGO_URL
        const client = new MongoClient(uri, { useUnifiedTopology: true })
        await client.connect()
        return client.db('Inmobiliaria').collection(this.collection).aggregate(this.pipeline)
    }
}

module.exports = ClientStrategy