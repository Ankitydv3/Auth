import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
  FaTicketAlt,
  FaShieldAlt,
  FaShare,
  FaHeart,
  FaClock,
  FaUsers,
  FaStar,
} from "react-icons/fa";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/event/${id}`);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setBookingLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      if (!showOTP) {
        await api.post("/booking/send-otp");
        setShowOTP(true);
        setSuccessMsg(
          "OTP sent to your email. Please verify to confirm booking.",
        );
      } else {
        await api.post("/booking", { eventId: event._id, otp });
        setSuccessMsg("Booking requested! Awaiting admin confirmation.");
        setShowOTP(false);
        setEvent({ ...event, availableSeats: event.availableSeats - 1 });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-6 text-xl font-semibold text-gray-700">
            Loading Event...
          </p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <FaTicketAlt className="text-red-500 text-4xl" />
          </div>
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  const isSoldOut = event.availableSeats <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100"
        >
          {/* Image Section */}
          <div className="relative h-[500px] overflow-hidden">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center">
                <FaTicketAlt className="text-white text-8xl opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute top-6 left-6">
              <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {event.category}
              </span>
            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="bg-white/90 backdrop-blur p-3 rounded-full hover:bg-white transition">
                <FaHeart className="text-gray-600 hover:text-pink-500 transition" />
              </button>
              <button className="bg-white/90 backdrop-blur p-3 rounded-full hover:bg-white transition">
                <FaShare className="text-gray-600 hover:text-pink-500 transition" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Event Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendarAlt className="text-pink-500" />
                  <span>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaClock className="text-pink-500" />
                  <span>
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-pink-500" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  About This Event
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-white rounded-2xl p-6 border border-pink-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-pink-500" />
                  Important Information
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    • E-tickets will be sent to your email after confirmation
                  </li>
                  <li>• Please carry a valid ID proof for entry</li>
                  <li>• Gates open 1 hour before the event starts</li>
                  <li>• No refunds on cancellations</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 shadow-xl sticky top-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaTicketAlt />
                  Booking Details
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-white">
                    <span className="flex items-center gap-2">
                      <FaMoneyBillWave />
                      Ticket Price
                    </span>
                    <span className="font-bold text-2xl">
                      {event.ticketPrice === 0
                        ? "FREE"
                        : `₹${event.ticketPrice}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="flex items-center gap-2">
                      <FaChair />
                      Available Seats
                    </span>
                    <span
                      className={`font-bold text-2xl ${event.availableSeats < 10 ? "text-yellow-300" : "text-white"}`}
                    >
                      {event.availableSeats} / {event.totalSeats}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="flex items-center gap-2">
                      <FaUsers />
                      Attendees
                    </span>
                    <span className="font-bold text-xl">
                      {event.totalSeats - event.availableSeats}+
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {showOTP && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <label className="block text-sm font-semibold text-white mb-2">
                        Enter OTP to Confirm
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="6-digit code"
                        className="w-full px-4 py-3 rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white font-bold tracking-widest text-center text-lg"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength="6"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg mb-4 ${
                    isSoldOut
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-white text-pink-600 hover:shadow-xl"
                  }`}
                >
                  {bookingLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : showOTP ? (
                    "Verify OTP & Confirm"
                  ) : successMsg && !showOTP ? (
                    "Request Sent ✓"
                  ) : isSoldOut ? (
                    "Sold Out"
                  ) : (
                    "Confirm Registration"
                  )}
                </motion.button>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-200 text-center text-sm bg-white/10 rounded-lg p-2"
                  >
                    {error}
                  </motion.p>
                )}
                {successMsg && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-200 text-center text-sm bg-white/10 rounded-lg p-2"
                  >
                    {successMsg}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
