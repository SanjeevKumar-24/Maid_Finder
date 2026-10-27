const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

// Link the API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/helpers', require('./routes/helpers'));
app.use('/api/bookings', require('./routes/bookings'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));