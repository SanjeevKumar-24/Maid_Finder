const mongoose = require('mongoose');

const helperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: ['maid', 'nanny', 'babysitter'] },
    skills: [{ type: String }], // e.g., ["cooking", "cleaning", "childcare"]
    servicePlans: {
        hourlyRate: { type: Number },
        monthlyRate: { type: Number },
        yearlyRate: { type: Number }
    },
    isVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Helper', helperSchema);