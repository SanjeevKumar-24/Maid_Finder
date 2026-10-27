const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    clientId: { type: String, required: true }, // Placeholder for User ID
    helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Helper', required: true },
    planType: { type: String, enum: ['hourly', 'monthly', 'yearly'], required: true },
    startDate: { type: Date, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);