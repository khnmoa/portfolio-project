const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, 
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
