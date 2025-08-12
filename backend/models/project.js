const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String, 
  demoLink: String, 
  codeLink: String, 
  technologies: [String] 
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
