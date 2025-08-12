require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Routes imports
const aboutRoutes = require('./routes/aboutRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Default route
app.get('/', (req, res) => res.send('Portfolio API running'));

// Use Routes
app.use('/about', aboutRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);
app.use('/experience', experienceRoutes);
app.use('/service', serviceRoutes);
app.use('/message', messageRoutes);

// Connect to DB
connectDB(process.env.MONGO_URI);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
