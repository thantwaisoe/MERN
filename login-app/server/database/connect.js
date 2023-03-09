const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ENV = require('../config') 
const connect = async () => {
    const mongod = await MongoMemoryServer.create(); // create new Mongo Memory Server instance
    const getUri = mongod.getUri(); // get created mongodb Url
    mongoose.set('strictQuery', true); // remove error warning
    const db = mongoose.connect(ENV.MONGODB_URL); // actual connect
    console.log('DB is connected');

    return db;
};

module.exports = { connect };
