const mongodb = require('mongodb');

const MongodbClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongodbClient.connect('mongodb://localhost:27017');

    database = client.db('blog-project');
}

function getDb() {
    if(!database) {
        throw new Error('Connect to database first!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}