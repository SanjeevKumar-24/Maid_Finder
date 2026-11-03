const express = require('express');
const router = express.Router();
const Helper = require('../models/Helper');

// GET all helpers for the dashboard
router.get('/', async (req, res) => {
  try {
    const helpers = await Helper.find();
    res.json(helpers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to quickly seed the database
router.post('/seed', async (req, res) => {
  const sampleHelpers = [
    { name: "Aarti Devi", role: "Maid", hourlyRate: 250, monthlyRate: 6000, isVerified: true },
    { name: "Sunita Sharma", role: "Cook", hourlyRate: 300, monthlyRate: 8000, isVerified: true },
    { name: "Ramesh Kumar", role: "Cleaner", hourlyRate: 200, monthlyRate: 5000, isVerified: false },
    { name: "Priya Singh", role: "Nanny", hourlyRate: 400, monthlyRate: 12000, isVerified: true }
  ];

  try {
    await Helper.deleteMany(); // Clears old data to prevent duplicates
    const insertedHelpers = await Helper.insertMany(sampleHelpers);
    res.status(201).json(insertedHelpers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});