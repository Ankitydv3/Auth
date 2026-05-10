// EventDetail.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
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

  // FETCH EVENT
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

  // BOOK EVENT
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
        await api.post("/booking", {
          eventId: event._id,
          otp,
        });

        setSuccessMsg("Booking requested! Awaiting admin confirmation.");

        setShowOTP(false);

        // Update seat count instantly
        setEvent({
          ...event,
          availableSeats: event.availableSeats - 1,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // LOADING
  if (loading)
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );

  // ERROR
  if (error && !event)
    return (
      <div className="text-center py-20 text-xl text-red-500">{error}</div>
    );

  const isSoldOut = event.availableSeats <= 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* IMAGE */}
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-[400px] object-cover"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-900 flex items-center justify-center text-white text-3xl font-bold">
            {event.category}
          </div>
        )}

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-10 p-8">
          {/* LEFT */}
          <div>
            <div className="inline-block bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              {event.category}
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {event.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {event.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

            <div className="space-y-6">
              {/* PRICE */}
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                  <FaMoneyBillWave />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase">
                    Ticket Price
                  </p>

                  <p className="font-bold text-green-600 text-lg">
                    {event.ticketPrice === 0 ? "Free" : `₹${event.ticketPrice}`}
                  </p>
                </div>
              </div>

              {/* AVAILABILITY */}
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                  <FaChair />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase">
                    Availability
                  </p>

                  <p className="font-bold text-gray-800">
                    <span
                      className={
                        event.availableSeats < 10 ? "text-orange-500" : ""
                      }
                    >
                      {event.availableSeats}
                    </span>{" "}
                    / {event.totalSeats}
                  </p>
                </div>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase">
                    Date
                  </p>

                  <p className="font-bold text-gray-800">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-4 text-gray-700">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-400 uppercase">
                    Location
                  </p>

                  <p className="font-bold text-gray-800">{event.location}</p>
                </div>
              </div>
            </div>

            {/* OTP INPUT */}
            {showOTP && (
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP to Confirm
                </label>

                <input
                  type="text"
                  required
                  placeholder="6-digit code"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                />
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handleBooking}
              disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition shadow-lg mt-8 ${
                isSoldOut
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-black text-white hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {bookingLoading
                ? "Processing..."
                : showOTP
                  ? "Verify OTP & Confirm"
                  : successMsg && !showOTP
                    ? "Request Sent"
                    : isSoldOut
                      ? "Sold Out"
                      : "Confirm Registration"}
            </button>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 mt-4 text-center font-medium bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            {/* SUCCESS */}
            {successMsg && (
              <p className="text-green-600 mt-4 text-center font-medium bg-green-50 p-2 rounded">
                {successMsg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
