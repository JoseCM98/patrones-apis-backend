const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongo;

async function connect() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: 'empleados_test' });
}
async function close() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
}
async function clear() {
  const { collections } = mongoose.connection;
  for (const k of Object.keys(collections)) await collections[k].deleteMany({});
}
module.exports = { connect, close, clear };
