const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId, // Referencia o usuário somente pelo ID
        ref: 'User' // qual o model que eu estou usando como refetrencia
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId, // Referencia o usuário somente pelo ID
        ref: 'Spot' // qual o model que eu estou usando como refetrencia
    },
});

module.exports = mongoose.model('Booking', BookingSchema);