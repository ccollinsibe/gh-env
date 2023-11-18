import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const uri2 = `mongodb://${dbUser}:${dbPassword}@ac-hvwu9tf-shard-00-00.ldmnxb4.mongodb.net:27017,ac-hvwu9tf-shard-00-01.ldmnxb4.mongodb.net:27017,ac-hvwu9tf-shard-00-02.ldmnxb4.mongodb.net:27017/?ssl=true&replicaSet=atlas-rbju6t-shard-0&authSource=admin&retryWrites=true&w=majority`
const client = new MongoClient(uri2);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.log(error);
  await client.close();
  console.log('Connection closed.');
}

const database = client.db(dbName);

export default database;
