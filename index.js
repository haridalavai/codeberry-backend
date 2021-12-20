const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mongoose = require('mongoose');
const mongo = require('mongodb');
const { MongoClient } = require('mongodb');

const app = express();

MongoClient.connect(
  `mongodb+srv://admin:n1EGy8UtXxMpuf1w@cluster0.qhlhp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
)
  .then((client) => {
    console.log('connected to db');

    const db = client.db('codeberry-users');

    const userCollection = db.collection('users');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.post('/user', async (req, res) => {
      try {
        const result = await userCollection.insertOne(req.body);
        res.send({ status: 'success', message: result });
      } catch (e) {
        res.send({ status: 'error', message: e.message });
      }
    });

    app.get('/users', async (req, res) => {
      try {
        const users = await userCollection.find().toArray();
        console.log(users);
        res.send({ status: 'success', users });
      } catch (e) {}
    });

    app.post('/update-user', async (req, res) => {
      const userId = req.body.userId;
      const updateDoc = req.body;
      delete updateDoc.userId;

      for (key in updateDoc) {
        if (updateDoc[key] === '') delete updateDoc[key];
      }
      console.log(updateDoc);

      try {
        const user = await userCollection.findOneAndUpdate(
          { userId },
          {
            $set: { ...updateDoc },
          },
        );
        console.log(user);
        res.send(user);
        // const user = await userCollection.findOne({ id: id });
        // console.log(user);
      } catch (e) {
        console.log(e);
        res.send({ status: 'error', message: e.message });
      }
    });

    app.post('/delete-user', (req, res) => {
      userCollection
        .deleteOne({
          userId: req.body.userId,
        })
        .then((result) => {
          console.log(result);
          res.send(result);
        });
      console.log(req.body);
    });
    app.get('/', (req, res) => {
      res.send('hello');
    });
    app.listen(4000, () => {
      console.log('server stare=ted');
    });
  })
  .catch(console.error);
