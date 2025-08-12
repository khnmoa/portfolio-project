const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  email: String,
  phone: String,
  location: String,
  cvLink: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
