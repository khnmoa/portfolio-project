const Experience = require('../models/experience');


exports.getExperiences = async (req, res) => {
  try {
    const ex = await Experience.find().sort({ startDate: -1, createdAt: -1 });
    res.json(ex);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getExperienceById = async (req, res) => {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Experience not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// إنشاء خبرة
exports.createExperience = async (req, res) => {
  try {
    const { company, role, startDate } = req.body;
    if (!company || !role || !startDate) {
      return res.status(400).json({ error: 'company, role and startDate are required' });
    }

    const e = new Experience(req.body);
    await e.save();
    res.status(201).json(e);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// تعديل خبرة
exports.updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Experience not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// حذف خبرة
exports.deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
