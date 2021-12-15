const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
// const { User } = require('./User');

// const client = new MongoClient(
//   `mongodb+srv://admin:fzbNl7OTapdgl4AB@cluster0.qhlhp.mongodb.net/usersc?retryWrites=true&w=majority`,
// );
app.use(cors);
let userss;

async function main() {
  const uri = `mongodb+srv://admin:fzbNl7OTapdgl4AB@cluster0.qhlhp.mongodb.net/usersc?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    await getUsers(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

const getUsers = async (client) => {
  const users = await client
    .db('usersc')
    .collection('users')
    .find({})
    .toArray();
  console.log(users);
  userss = users;
};
main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

app.get('/', (req, res) => {
  res.send('');
});

app.get('/users', async (req, res) => {
  //   const users = await getUsers();
  res.send(userss);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server started');
});
