const Message = require('../models/message');

exports.getMessages = async (req, res) => {
  try {
    const msgs = await Message.find().sort({ createdAt: -1 });
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const m = await Message.findById(req.params.id);
    if (!m) return res.status(404).json({ error: 'Message not found' });
    res.json(m);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });

    const m = new Message({ name, email, message });
    await m.save();
    res.status(201).json({ success: true, message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
