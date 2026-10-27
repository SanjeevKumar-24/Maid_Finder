const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST a new booking request
router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('helperId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;