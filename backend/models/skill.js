const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: String, // 'Beginner', 'Intermediate', 'Advanced'
  icon: String 
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
