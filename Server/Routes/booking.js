const express = require('express');

const router = express.Router();

const {
  protect,
  admin
} = require('../Middleware/auth');

const {
  bookEvent,
  sendBookingOTP,
  getMyBooking,
  confirmBooking,
  cancelBooking,
  getAllBookings
} = require('../Controller/bookingController');


// USER ROUTES

router.post(
  '/send-otp',
  protect,
  sendBookingOTP
);

router.post(
  '/',
  protect,
  bookEvent
);

router.get(
  '/my',
  protect,
  getMyBooking
);


// ADMIN ROUTES

router.get(
  '/',
  protect,
  admin,
  getAllBookings
);

router.put(
  '/:id/confirm',
  protect,
  admin,
  confirmBooking
);

router.put(
  '/:id/cancel',
  protect,
  admin,
  cancelBooking
);

module.exports = router;