const {MongoClient}=require('mongodb');
const url = 'mongodb://localhost:27017';
const dbase = 'practice_realstate';


 async function getConnect()
{
  const client = new MongoClient(url);
  const result = await client.connect();
  const db = result.db(dbase);
  const users = db.collection('Users');
  return users;
  // const data = await users.find().toArray();
  // console.log("data",data);
}

module.exports = { getConnect };