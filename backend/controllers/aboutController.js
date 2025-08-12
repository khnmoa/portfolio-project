const About = require('../models/about');


exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const data = req.body;
    const about = await About.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
