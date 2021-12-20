const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
  name: { type: String },
  designation: { type: String },
  followers: { type: String },
  following: { type: String },
  posts: { type: String },
});
const User = mongoose.model('Users', user_schema);

module.exports = { User };
8034obvv