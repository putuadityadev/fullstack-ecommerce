require('dotenv').config({path: './.env'})
const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let database;

module.exports = {
  connectToServer: async () => {
    await client.connect();
    database = client.db('shopdi_database')
    console.log("Success connect to MongoDB!")
  },
  getDb: () => {
    if(!database) throw new Error("Database not found");
    return database
  }
}

console.log("test server")