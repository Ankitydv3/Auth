const Booking = require('../Models/Booking');
const Event = require('../Models/Event');
const OTP = require('../Models/OTP');

const { sendOtpEmail, sendBookingEmail } = require('../utils/email');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendBookingOTP = async (req, res) => {
    try {
        const otp = generateOTP();

        await OTP.deleteMany({
            email: req.user.email,
            action: 'event_booking'
        });

        await OTP.create({
            email: req.user.email,
            otp,
            action: 'event_booking'
        });

        await sendOtpEmail(req.user.email, otp, 'event_booking');

        res.json({ message: 'OTP sent to email' });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

exports.bookEvent = async (req, res) => {
    try {
        const { eventId, otp } = req.body;

        const otpRecord = await OTP.findOne({
            email: req.user.email,
            otp,
            action: 'event_booking'
        });

        if (!otpRecord) {
            return res.status(400).json({
                message: 'Invalid or expired OTP'
            });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.availableSeats <= 0) {
            return res.status(400).json({
                message: 'No seats available'
            });
        }

        let booking = await Booking.findOne({
            userId: req.user._id,
            eventId,
            status: 'pending'
        });

        if (!booking) {
            booking = await Booking.create({
                userId: req.user._id,
                eventId,
                amount: event.ticketPrice,
                paymentStatus: 'pending',
                status: 'pending'
            });
        }

        await OTP.deleteMany({
            email: req.user.email,
            action: 'event_booking'
        });

        res.status(201).json({
            message: 'Booking created successfully',
            bookingId: booking._id
        });

    } catch (error) {
        console.error('Book event error:', error);
        res.status(500).json({ message: 'Error booking event' });
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        if (!['completed', 'non-paid'].includes(paymentStatus)) {
            return res.status(400).json({
                message: 'Invalid payment status'
            });
        }

        const booking = await Booking.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('eventId', 'title totalSeats availableSeats');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.status === 'confirmed') {
            return res.status(400).json({
                message: 'Already confirmed'
            });
        }

        if (booking.status === 'cancelled') {
            return res.status(400).json({
                message: 'Cannot confirm a cancelled booking'
            });
        }

        const event = await Event.findById(booking.eventId._id);

        if (event.availableSeats <= 0) {
            return res.status(400).json({
                message: 'No seats available'
            });
        }

        // Decrease available seats
        event.availableSeats -= 1;
        await event.save();

        // Update booking
        booking.status = 'confirmed';
        booking.paymentStatus = paymentStatus;
        await booking.save();

        await sendBookingEmail(
            booking.userId.email,
            booking._id,
            booking.eventId.title,
            booking.status
        );

        res.json({ message: 'Booking confirmed', booking });

    } catch (error) {
        console.error('Confirm booking error:', error);
        res.status(500).json({ message: 'Error confirming booking' });
    }
};

exports.cancelBooking = async (req, res) => {
    try {

        const booking = await Booking.findById(req.params.id)
            .populate(
                'eventId',
                'title totalSeats availableSeats'
            );

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // Only admin can cancel
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Not authorized to cancel this booking'
            });
        }

        // Already cancelled
        if (booking.status === 'cancelled') {
            return res.status(400).json({
                message: 'Booking already cancelled'
            });
        }

        // Check previous status
        const wasConfirmed =
            booking.status === 'confirmed';

        // Update booking
        booking.status = 'cancelled';
        booking.paymentStatus = 'failed';

        await booking.save();

        // Return seat if booking was confirmed
        if (wasConfirmed && booking.eventId) {

            const event = await Event.findById(
                booking.eventId._id
            );

            if (event) {

                event.availableSeats += 1;

                await event.save();
            }
        }

        res.json({
            message: 'Booking cancelled successfully',
            booking
        });

    } catch (error) {

        console.error(
            'Cancel booking error:',
            error
        );

        res.status(500).json({
            message: 'Error cancelling booking'
        });
    }
};

exports.getMyBooking = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
            .populate('eventId', 'title date location totalSeats availableSeats ticketPrice');

        res.json(bookings);

    } catch (error) {
        console.error('Get my bookings error:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('userId', 'name email')
            .populate('eventId', 'title date location totalSeats availableSeats ticketPrice');
        
        res.json(bookings);
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            message: 'Error fetching all bookings'
        });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('eventId', 'title date location totalSeats availableSeats ticketPrice');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json(booking);
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ message: 'Error fetching booking' });
    }
};