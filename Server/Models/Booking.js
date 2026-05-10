const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'Confirmed', 'cancelled'],
        default: 'pending'
    },
   paymentStatus: {
    type: String,
    enum: [
        'pending',
        'completed',
        'non-paid',
        'failed'
    ],
    default: 'pending'
},
    amount: {
        type: Number,
        required: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);