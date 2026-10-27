const express = require('express');
const router = express.Router();
const Helper = require('../models/Helper'); // Import the schema

// POST a new helper profile to the database
router.post('/', async (req, res) => {
    try {
        const newHelper = new Helper(req.body);
        const savedHelper = await newHelper.save();
        res.status(201).json(savedHelper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET all verified helpers
router.get('/', async (req, res) => {
    try {
        // Fetch only workers who have passed background checks
        const helpers = await Helper.find({ isVerified: true });
        res.json(helpers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a specific helper by ID
router.get('/:id', async (req, res) => {
    try {
        const helper = await Helper.findById(req.params.id);
        if (!helper) return res.status(404).json({ message: 'Helper not found' });
        res.json(helper);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;