const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String 
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
