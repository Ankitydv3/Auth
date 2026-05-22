import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTicketAlt,
  FaArrowRight,
  FaShare,
} from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center border border-pink-100">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaCheckCircle className="text-white text-6xl" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold"
            >
              ✓
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black text-gray-800 mb-3"
          >
            Booking Confirmed! 🎉
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            Your ticket has been booked successfully.
            <br />A confirmation email has been sent to your account.
          </motion.p>

          {/* Ticket Icon Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-4 mb-8 border border-pink-100"
          >
            <div className="flex items-center justify-center gap-3">
              <FaTicketAlt className="text-pink-500 text-2xl animate-bounce" />
              <span className="text-gray-700">E-ticket sent to your email</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Link
              to="/user/dashboard"
              className="block w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              View My Tickets <FaArrowRight />
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-100 text-gray-700 font-semibold py-4 rounded-2xl hover:bg-gray-200 transition-all"
            >
              Discover More Events
            </Link>
            <button className="w-full border border-pink-200 text-pink-600 font-semibold py-3 rounded-2xl hover:bg-pink-50 transition-all flex items-center justify-center gap-2">
              <FaShare /> Share on Social Media
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
